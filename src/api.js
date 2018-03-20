import axios from 'axios';
import fileDownload from 'react-file-download';


export function downloadApp({
    version, projectId, companyId, appId,
}) {
    return fileDownload(
        `${window.location.origin}/api/download?version=${version}&projectId=${projectId}&appId=${appId}&companyId=${companyId}`,
        `${appId}-${version}`,
    );
    // return axios.get(`/api/download?version=${version}&projectId=${projectId}&appId=${appId}&companyId=${companyId}`)
    // .then(({ data }) => (axios.get(data)))
    // .then(({ status, data }) => {
    //     if (status === 200) {
    //         return fileDownload(data, `${appId}-${version}`);
    //     }
    //     return console.log(data);
    // })
    // .catch(console.log);
}

export function getStableVersions({ projectId }) {
    return axios.get(`/api/version/stable/all?projectId=${projectId}`).then(({ data }) => (data));
}
