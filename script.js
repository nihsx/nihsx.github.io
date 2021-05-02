$.ajax({
    url: 'https://api.github.com/users/xshin404',
    success: results => {
        let avatar = '';
        avatar += showAvatar(results);
        $('.avatar-url').html(avatar);
    },
    error: (e) => {
        alert(e.responseText);
    }
});

function showAvatar(datauser) {
    return `<img src="${datauser.avatar_url}" class="img-fluid rounded-circle">`;
}