const loadGooglePlatform = (): void => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  document.body.appendChild(script);
};

export { loadGooglePlatform };
