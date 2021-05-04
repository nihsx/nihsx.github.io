// Menggunakan jQuery

$.ajax({
    url: 'https://api.github.com/users/xshin404',
    success: results => {
        let author = '';
        author += showAuthor(results);
        $('.author').html(author);
    },
    error: (e) => {
        let author = '';
        author += (e.responsText);
        $('.author').html(author);
    }
});

$('.search-button').on('click', function() {

    $.ajax({
        url: 'https://api.github.com/users/' + $('.input-keyword').val(),
        success: results => {
            let info = '';
            info += showUser(results);
            $('.user').html(info);

            // Tampilkan detail repository
            $.ajax({
                url: "https://api.github.com/users/" + $('.input-keyword').val() + "/repos",
                success: results => {
                    let repos = '';
                    results.forEach(r => {
                        repos += showRepos(r);
                    });
                    $('.repo-container').html(repos);
            
                    // Ketika tombil show details di klik
                    $('.modal-detail-button').on('click', function() {
                        $.ajax({
                            url: 'https://api.github.com/repos/' + $(this).data('repo'),
                            success: rd => {
                                const repoDetail = showRepoDetails(rd);
                                $('.modal-body').html(repoDetail);
                            },
                            error: (e) => {
                                console.log(e.responsText);
                            }
                        });
                    });
            
            },
            error: e => {console.log(e.responseText);}
            });
        },
        error: () => {
            Swal.fire({
                icon: 'error',
                title: 'Opsss...',
                html: '<i class="fab fa-github"></i> : User <b>' + $('.input-keyword').val() + '</b> not found!!!',
              })
        }
    });

});

// // Menggunakan fetch (Vanilla Javascript)

// // Mulai menampilkan pesan author
// fetch("https://api.github.com/users/xshin404")
//     .then(response => response.json())
//     .then(response => {
//         let author = '';
//         author += showAuthor(response);
//         const divAuthor = document.querySelector('.author');
//         divAuthor.innerHTML = author;
//     });
// // Akhir menampilkan pesan author

// // Mulai ketika tombol search di klik
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function() {
//     const inputKeyword = document.querySelector('.input-keyword');

//     // Mulai menampilkan informasi user seperti: 
//     // * Avatar
//     // * Username
//     // * Bio
//     // * Dll
//     fetch("https://api.github.com/users/" + inputKeyword.value)

//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Opsss...',
//                     html: '<i class="fab fa-github"></i> : User <b>' + $('.input-keyword').val() + '</b> not found!!!',
//                 })
//             }
//         })

//         .then((responseJson) => {
//             let info = '';
//             info += showUser(responseJson);
//             const user = document.querySelector('.user');
//             user.innerHTML = info;

//             // Mulai menampilkan repository user
//             fetch("https://api.github.com/users/" + inputKeyword.value + "/repos")
//                 .then(response => response.json())
//                 .then(response => {
//                     const results = response;
//                     let repos = '';
//                     results.forEach(r => {
//                         repos += showRepos(r);
//                     })

//                     const repoContainer = document.querySelector('.repo-container');
//                     repoContainer.innerHTML = repos;

//                     // Mulai ketika tombol show details repository di klik
//                     const modalDetailButton = document.querySelectorAll('.modal-detail-button');
//                     modalDetailButton.forEach(btn => {
//                         btn.addEventListener("click", function() {
//                             fetch("https://api.github.com/repos/" + this.dataset.repo)
//                                 .then(response => response.json())
//                                 .then(response => {
//                                     const repoDetail = showRepoDetails(response);
//                                     const modalBody = document.querySelector(".modal-body")
//                                     modalBody.innerHTML = repoDetail;
//                                 })
//                             })
//                         });
//                     // Akhir ketika tombol show details repository di klik

//                 })
//             // Akhir menampilkan repository user
//         })

// });
// // Akhir ketika tombol search di klik


function showAuthor(author) {
    return `<p>Made by <span style="color: red;">❤️</span> from <a href="${author.html_url}">${author.name}</a>`    
}

function showUser(user) {
    return `<img src="${user.avatar_url}" alt="hero" style="width: 200px;" class="rounded-circle mb-2" id="hero">
    <h1 class="display-4">${user.login}</h1>
    <h4 class="text-muted">${user.name}</h4>
    <p class="lead">${user.bio ? `${user.bio}` : 'No Bio'}</p>
    <p>
        <i class="fas fa-heart"> ${user.followers} Followers</i>
        <i class="fas fa-user-friends"> ${user.following} Following</i>
        <i class="fas fa-folder-open"> ${user.public_repos} Public Repository</i>
    </p>`;
}

function showRepos(repos) {
    return `<div class="col-md-4 my-3">
                <div class="card bg-dark" style="width: 18rem;">
                    <img src="img/github-icon.png" class="card-img-top">
                    <div class="card-body text-white">
                        <h5 class="card-title">${repos.full_name}</h5> 
                        <span class="text-right"><i class="fas fa-code-branch text-muted"></i> ${repos.forks_count}</span> 
                        <span class="text-right"><i class="fas fa-star" style="color: #ebbc21;"></i> ${repos.stargazers_count}</span> 
                        <p class="card-subtitle mb-2 text-muted">${repos.description ? `${repos.description}` : 'No Description'}</p>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#repoDetailModal" data-repo="${repos.full_name}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showRepoDetails(repodetail) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="img/github-icon.png" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Repository Name: </strong>${repodetail.name}</li>
                            <li class="list-group-item"><strong>Forks Count: </strong>${repodetail.forks_count}  <strong><i class="fas fa-code-branch"></i></strong></li>
                            <li class="list-group-item"><strong>Stargazers Count: </strong>${repodetail.stargazers_count}  <strong><i class="fas fa-star" style="color: #ebbc21;"></i></strong></li>
                            <li class="list-group-item"><strong>Watcher Count: </strong>${repodetail.subscribers_count}  <strong><i class="fas fa-eye"></i></strong></li>
                            <li class="list-group-item"><strong>Open Issues: </strong>${repodetail.open_issues} <strong><i class="fas fa-exclamation-triangle" style="color: red;"></i></strong></li>
                            <li class="list-group-item"><strong>Description: </strong><br> ${repodetail.description ? `${repodetail.description}` : 'No Description'}</li>
                            <li class="list-group-item"><strong>License: </strong><br> ${repodetail.license ? `${repodetail.license.name}` : 'No License'}</li>
                            <li class="list-group-item"><strong>Highest Percentage Language: </strong>${repodetail.language ? `${repodetail.language}` : "Can't detect Language"}</li>
                            <li class="list-group-item"><strong>Size: </strong>${Math.floor(repodetail.size / 1024)} <strong>MB</strong></li>
                            <li class="list-group-item"><strong>Created at: </strong>${repodetail.created_at}</li>
                            <li class="list-group-item"><strong>Updated at: </strong>${repodetail.updated_at}</li>
                            <li class="list-group-item"><strong>Contributors: </strong><br><br> <a href="https://github.com/${repodetail.full_name}/graphs/contributors"><img src="https://contrib.rocks/image?repo=${repodetail.full_name}" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="https://github.com/${repodetail.full_name}"><button type="button" class="btn btn-primary">Visit <i class="fas fa-sign-in-alt"></i></button></a>
            </div>`;
}