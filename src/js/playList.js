  // EN ESTA PARTE VAMOS A MOSTRAR PELICILAS EN LA PARTE LATERAL DE LA PAGINA

  // con esta funciones consumiendo los datos de al API - 
  // se pueden ver los datos optenidos por el servidor

  (async function load() {
    async function getData(url) {
      const response = await fetch(url);
      const data = await response.json()
      return data;
    }
  // optenemos las peliculas 3D desde el servidor 
    const dList = await getData('https://yts.mx/api/v2/list_movies.json?quality=3D')
    const genresList = await getData('https://yts.mx/api/v2/list_movies.json?genres')

    
    console.log(dList)

    //CREACION DE TEMPLATES
  // tomar un texto base para comvertirlo en un texto programable
  function playListTemplate(movie) {


    return (
      ` 
      <li class="playlistFriends-item">
      <a href="#">
      <img src="${movie.medium_cover_image}">
      <span>
      ${movie.title}
      </span>
    </a>
  </li>
      `
    )
  }

  //////////////////////////////////////////////////////////////////////////////
  //pasa los datos obtenidos por un forEach para poder mostrarlos en pantalla
  // TODO EN 3D
  const $containerlist = document.getElementById('playList3D')
  
  dList.data.movies.forEach((movie) => {
   
    const HTMLString = playListTemplate(movie);
		$containerlist.innerHTML += HTMLString;

  })

//////////////////////////////////////////////////////////////////////////////
  // LO ULTIMO FAVORITAS
  // vemos el mismo resultado que lo anterior, aunque que con un codigo mas legible
  
  function playlistFriendsTemplate(movie) {
    return (
      `
      <li class="playlistFriends-item">
      <a href="#">
      <img src="${movie.medium_cover_image}">
      <span>
      ${movie.title}
      </span>
      </a>
      </li>
      `
      )
    }
    // esto lo hacemos para hacer la funcion mas dinamica
    
  const $containerFriends = document.getElementById('playlistFriends');
  
  function createTemplate(HTMLString) {
      const html = document.implementation.createHTMLDocument();
      $containerFriends.innerHTML += HTMLString;
    }
    
  function renderMovieList(list, $container) {
      list.forEach((movie) => {
        const HTMLString = playlistFriendsTemplate(movie);
        const movieElement = createTemplate(HTMLString);
      });
    }
    
    renderMovieList(genresList.data.movies, $containerFriends);
 
    //////////////////////////////////////////////////////////////////////////////////
    
    
    //SELECTORES
    // const $home = $(".home .sidebarPlaylist") ESTO EN JQUERY
    //Elemento con la clase home
    const $home = document.getElementById('home');
    const $myPlaylist = $containerlist.querySelector('ul')
    const $listImg =  $containerlist.querySelector('img')
    
    const $myPlaylistFriends = $containerFriends.querySelector('ul')
    const $listImgFriends =  $containerFriends.querySelector('img')
    
  })()


  ////////////////////////////////////////////////////////