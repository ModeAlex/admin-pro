export default ({ $axios, redirect, $Message }) => {
    $axios.onRequest(config => {
    })
    $axios.onError(err => {
        console.log($Message)
        $Message.success('网络请求失败')
    })
    $axios.onResponse(response => {
        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    })
}