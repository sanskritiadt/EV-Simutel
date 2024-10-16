function showSubItems(subMenuId, menuId) {
  if(document.getElementById(subMenuId).style.display == 'none'){
    // document.querySelectorAll('.sub-menu').forEach(menu => menu.style.display = 'none');
    document.querySelectorAll('.menuItem').forEach(item => item.classList.remove('active'));
    document.getElementById(subMenuId).style.display = 'block';
    document.getElementById(menuId).classList.add('active');
  } else {
    // document.querySelectorAll('.sub-menu').forEach(menu => menu.style.display = 'none');
    document.querySelectorAll('.menuItem').forEach(item => item.classList.remove('active'));
  } 
  
}