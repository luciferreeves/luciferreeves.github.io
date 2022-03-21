window.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const renderPreview = document.getElementById("renderPreview");
  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });
  content.addEventListener("input", () => {
    renderPreview.innerHTML = marked.parse(content.value);
    renderMathInElement(renderPreview, {
      // customised options
      // • auto-render specific keys, e.g.:
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
      ],
      // • rendering keys, e.g.:
      throwOnError: false,
    });
  });
});
$(document).on("click", "#publishPost", () => {
  document.getElementById("error").classList.add("hidden");
  const content = $("#content").val();
  const title = $("#title").val();
  const publishDate = $("#publishDate").val();
  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
  const tags = $("#tags").val();
  if (title === "" || publishDate === "") {
    document.getElementById("error").classList.remove("hidden");
    return;
  } else {
    // Publish post to api/blog/new
    const body = {
      title: title,
      publishDate: publishDate,
      tags: tags,
      content: content,
      shortText: marked.parse(content.substring(0, 120) + "..."),
      slug: slug,
    };
    if (window.location.href.includes(slug)) {
      // Update post
      $.ajax({
        url: `/api/blog/update/${slug}`,
        type: "PUT",
        data: body,
        success: function (data) {
          window.location.href = `/posts/${slug}`;
        },
        error: function (err) {
          console.log(err);
        },
      });
    } else {
      $.ajax({
        url: "/api/blog/new",
        type: "POST",
        data: body,
        success: (data) => {
          window.location.href = "/admin/dashboard";
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
});
