import axios from 'axios';

export function getUser({ projectId }) {
    return axios.get(`/api/version/stable/all?projectId=${projectId}`).then(({ data }) => (data));
}
