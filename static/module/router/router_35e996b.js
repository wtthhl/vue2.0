define("module/router/router",function(e){var n=e("module/components/app"),o=function(){var e=location.hash;e=e.replace(/^#\/?/,""),e=e.split("/");var o={list:!0,home:!0,detail:!0,login:!0,dingdan:!0,guide:!0};n.view=o[e[0]]?e[0]:"home",n.route=e.slice(1)};window.addEventListener("hashchange",o),o()});