const API_URL = 'https://brooms.herokuapp.com';

export const API = {
	ideas: async () => {
		const data = await (await fetch(`${API_URL}/ideas`)).json()
    return data._embedded.ideas;
  },
};
