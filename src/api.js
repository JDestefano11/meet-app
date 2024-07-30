import mockData from './mock-data';


// Extracts unique locations from event data
export const extractLocations = (events) => {
    return [...new Set(events.map((event) => event.location))];
};


// Verifies the validity of an access token
const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};

// Fetches events data from the API or returns mock data for local development
export const getEvents = async () => {
    if (window.location.href.startsWith("http://localhost") ||
        window.location.href.startsWith("https://jdestefano11.github.io/meet-app/")) {
        return mockData;
    }
    const token = await getAccessToken();

    if (token) {
        removeQuery();
        const url = "https://u4y2iy9ib0.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + "/" + token;
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
            return result.events;
        } else return null;
    }
};

// Manages the OAuth flow to obtain an access token
export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        // Clear existing token and initiate new OAuth flow
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        if (!code) {
            const response = await fetch(
                "https://u4y2iy9ib0.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
            );
            const result = await response.json();
            const { authUrl } = result;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};


// Exchanges authorization code for an access token
const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
        'https://u4y2iy9ib0.execute-api.eu-central-1.amazonaws.com/dev/api' + '/' + encodeCode
    );
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);

    return access_token;
};


// Removes query parameters from the URL after OAuth flow
const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};
