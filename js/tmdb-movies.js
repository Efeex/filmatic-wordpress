jQuery(function() { // Esecuzione solo quando il DOM della pagina è pronto: https://api.jquery.com/jQuery/#jQuery3

    var apiKey = "855d0f27ac90850576cebfa7bc46b9f6",
        container = jQuery("#movies-container"), // Selezione del container mediante selettore: https://api.jquery.com/jQuery/#jQuery-selector-context
        actorName = container.data('actor'); // Estrazione dei valori degli attributi data-* dal container: https://api.jquery.com/data/#data2

    jQuery.getJSON( // Chiamata AJAX con risposta di tipo JSON: https://api.jquery.com/jQuery.getJSON/
        "https://api.themoviedb.org/3/search/person", // Url dell'API per la ricerca degli attori
        {
          "api_key": apiKey,
          "query": actorName
        },
        function(actors) { // Funzione di callback, eseguita dopo aver ricevuto la risposta

          var actor = actors.results[0],
              actorId = actor.id; // Id interno dell'attore cercato (primo risultato)

          jQuery(".entry-header").append(
            '<div class="entry-cover"><img src="https://image.tmdb.org/t/p/w500'+actor.profile_path+'" width="100%"></div>'
          );

          jQuery.getJSON( // Seconda chiamata AJAX
            "https://api.themoviedb.org/3/discover/movie", // Url dell'API per la ricerca dei film per attore
            {
              "api_key": apiKey,
              "with_cast": actorId,
              "sort_by": "release_date.desc", // Dal più recente al più vecchio per data di uscita
              "language": "it-IT" // Sinossi in lingua italiana (se disponibili)
            },
            function(movies) {

              var lastMovies = 10;

              container.empty(); // Svuoto il contenitore

              movies.results.slice(0,lastMovies).forEach(function(movie) { // Ciclo sui primi 10 film

                  jQuery( // Costruzione di un template HTML con i dati dell'API
                    [
                      '					<div id="movie-' + movie.id + '" class="card post type-post format-standard hentry">',
                      '						  <div class="post-content row">',
                      '							    <div class="post-thumbnail col-md-6">',
                      '							  	  <a href="https://www.themoviedb.org/movie/' + movie.id + '" target="_blank" class="post-list-item-thumb"><img style="height:auto; width: auto;" src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '"></a>',
                      '							    </div>',
                      '							    <div class="col-md-6 col-padding col-padding-md content">',
                      '								    <h2 class="post-title">',
                      '									    <a href="https://www.themoviedb.org/movie/' + movie.id + '" target="_blank" rel="bookmark">' + movie.original_title + '</a>',
                      '								    </h2>',
                      '							      <div class="post-meta small muted space-bottom-small">',
                      '								      <span>Data di uscita:</span> <a href="https://www.themoviedb.org/movie/' + movie.id + '" target="_blank" rel="bookmark"><time datetime="' + movie.release_date + '">' + movie.release_date + '</time></a>',
                      '							      </div>',
                      '							      <div class="post-excerpt">',
                      '								      <p>' + (movie.overview || 'Sinossi non disponibile in italiano, <a href="#" class="load-original" data-movie-id="' + movie.id + '">vuoi leggere la versione originale?</a>') + '</p>',
                      '						      	</div>',
                      '						  	  </div>',
                      '						</div>',
                      '					</div>'
                    ].join("\n") // Metodo join di un array di stringhe, il risultato è una stringa HTML
                  ).appendTo(container); // Il nuovo elemento <article> è inserito nel contenitore

              });

              jQuery( // Aggiungo un link finale alla pagina dedicata all'attore su TMDB
                
                  
                    '<article><a href="https://www.themoviedb.org/person/'+actorId+'" target="_blank">Vedi tutti i film di '+actorName+'...</a></article>',
                  
              
              ).appendTo(container);

              container.find(".load-original").click(function(e) { // Intercetta il click su tutti i tag <a> delle descrizioni mancanti: https://api.jquery.com/click/#click-handler

                  var clickedElement = jQuery(this), // Il tag <a> cliccato
                      overviewContainer = clickedElement.parent(), // Il tag <p> che contiene il tag <a> cliccato
                      movieId = clickedElement.data('movie-id'); // L'id del film a cui si riferisce il tag <a> cliccato (dall'attributo data-movie-id)

                  overviewContainer.text("Loading..."); // Sostituzione del testo con un messaggio di loading: http://api.jquery.com/text/#text2

                  jQuery.getJSON( // Terza chiamata AJAX per ottenere i dettagli del film cliccato
                    "https://api.themoviedb.org/3/movie/"+movieId, // Url dell'API per i dettagli di un film
                    {
                      "api_key": apiKey,
                    },
                    function(movie) { // Funzione di callback
                      overviewContainer.text(movie.overview || "Non disponibile."); // Sostituzione del testo con quello della sinossi in lingua originale
                    }
                  );

                  e.preventDefault(); // Preveniamo il comportamento di default del click su un tag <a>: https://api.jquery.com/event.preventdefault/

              });
            }
          );
        }
    );
});
