$.ajax({
  url: 'https://api.github.com/repos/xshin404/myTermux',
  success: results => {
    let api = '';
    api += dom(results);
    $('.api').html(api);
  },
  error: (e) => {
    console.log(e.responsText);
  }
});

function dom(data) {
  return `
  <ul>
    <li><i class="fas fa-star text-warning me-2"></i>${data.stargazers_count}</li>
    <li><i class="fas fa-code-branch me-2"></i>${data.forks_count}</li>
  </ul>
  `
}