export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === "/" || url.pathname === "") {
      try {
        let response = await env.ASSETS.fetch(new Request(new URL('/index.html', url.origin), request));
        if (response.ok) return response;
      } catch(e) {}
    }
    
    let response = await env.ASSETS.fetch(request);
    
    if (response.status === 404) {
      const distRequest = new Request(new URL('/dist' + url.pathname, url.origin), request);
      response = await env.ASSETS.fetch(distRequest);
    }
    
    if (response.status === 404) {
      const indexRequest = new Request(new URL('/index.html', url.origin), request);
      response = await env.ASSETS.fetch(indexRequest);
    }
    
    return response;
  },
};
