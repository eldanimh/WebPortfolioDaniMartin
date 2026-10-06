// CloudFront Function "index-rewrite"
// Runtime: cloudfront-js-2.0 · Evento: Viewer Request · Comportamiento: Default (*)
// Distribución: E73LDC41SY75J
//
// Copia de la función publicada en AWS (CloudFront → Functions → index-rewrite).
// Si cambias algo aquí, pégalo en la consola de AWS y vuelve a publicarla.

function redirect(location, status) {
  return {
    statusCode: status,
    statusDescription: status === 301 ? "Moved Permanently" : "Found",
    headers: {
      location: { value: location },
      "cache-control": { value: "no-store" },
    },
  };
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // 1. Idioma automático, solo en la portada
  if (uri === "/") {
    var cookie = request.cookies.lang ? request.cookies.lang.value : "";

    if (cookie === "en") return redirect("/en/", 302);

    if (cookie !== "es") {
      var header = request.headers["accept-language"];
      var preferred = header ? header.value.split(",")[0].trim().toLowerCase() : "";
      if (preferred && preferred.indexOf("es") !== 0) return redirect("/en/", 302);
    }
  }

  // 2. "/en/" → "/en/index.html"
  if (uri.endsWith("/")) {
    request.uri += "index.html";
    return request;
  }

  // 3. "/en" → redirige a "/en/"
  if (uri.indexOf(".") === -1) return redirect(uri + "/", 301);

  return request;
}
