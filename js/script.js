var playerEl = document.getElementById("player");
var titleEl = document.getElementById("title");
var descEl = document.getElementById("desc");
var listEl = document.getElementById("movies");

function getAjaxJson(url, callback) {
	var request = new XMLHttpRequest();
	request.onload = function() {
		callback(request.response);
	}	
		
	request.onerror = function() {
		console.error(request.status);
	}
	request.open("GET", url, true);
	request.responseType = "json";
	request.send();
}

function renderMovies(movies) {
	listEl.innerHTML = '';
	movies.forEach(function(movie) {
		listEl.appendChild(renderMovie(movie));
	});
}

function renderMovie(movie) {
	var li = document.createElement('li');

	var cover = document.createElement('img');
	cover.src = `img/${movie.images.cover}`;

	var title = document.createElement('h5');
	title.textContent = movie.title;

	var year = document.createElement('p');
	year.textContent = movie.meta.releaseYear;

	li.appendChild(cover);
	li.appendChild(title);
	li.appendChild(year);

	li.onclick = function(event) {
		movieClick(event, movie);
	};

	return li;
}

function movieClick(event, movie) {
	var li = event.currentTarget;
	li.parentElement.childNodes.forEach(function(item) {
		if(item == li) {
			li.className = 'active';
		} else {
			item.className = '';
		}
	});
	
	playerEl.src = movie.streams[0].url;	
	titleEl.textContent = `${movie.title} (${movie.meta.releaseYear})`;
	var directors = movie.meta.directors.map(function(director) {
		return director.name;
	});
	var actors = movie.meta.actors.map(function(actor) {
		return actor.name;
	})
	descEl.innerHTML = `Director: ${directors.join(', ')}<br/>Actors: ${actors.join(', ')}`;
}

getAjaxJson("movies.json", renderMovies);