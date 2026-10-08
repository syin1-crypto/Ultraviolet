export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Sirve los archivos estáticos de tu carpeta dist (como uv.bundle.js, etc.)
    let response = await env.ASSETS.fetch(request);
    
    // Si la ruta no existe (un error 404), fuerza la carga del index.html principal
    if (response.status === 404) {
      const indexRequest = new Request(new URL('/index.html', url.origin), request);
      response = await env.ASSETS.fetch(indexRequest);
    }
    
    return response;
  },
};
