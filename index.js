export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Si entras a la página raíz, fuerza la carga del archivo index.html
    if (url.pathname === "/" || url.pathname === "") {
      try {
        let response = await env.ASSETS.fetch(new Request(new URL('/index.html', url.origin), request));
        if (response.ok) return response;
      } catch(e) {}
    }
    
    // Busca cualquier otra petición (como los archivos del proxy) en tus recursos activos
    let response = await env.ASSETS.fetch(request);
    
    // Si da un error 404, vuelve a intentar servir el index.html
    if (response.status === 404) {
      const indexRequest = new Request(new URL('/index.html', url.origin), request);
      response = await env.ASSETS.fetch(indexRequest);
    }
    
    return response;
  },
};
