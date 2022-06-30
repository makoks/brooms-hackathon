export const useAuth = () => {
  const localToken = localStorage.getItem('discord_token');
  if (localToken) {
    return localToken;
  }

  const urlParams = new URLSearchParams(window.location.hash.slice(1));
  const urlToken = urlParams.get('access_token');
  if (!urlToken) {
    return null;
  }

  localStorage.setItem('discord_token', urlToken);
  return urlToken;
};
