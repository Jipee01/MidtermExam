var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listMovies', function (req, res) {
    fs.readFile(__dirname + "/movies.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
var movie = {
    "Movie6": {
        "id": 6,
        "Title": "The Conference",
        "Actor": "Katia Winter, Adam Lundgren, Eva Melander",
        "Genre": "Comedy, Horror, Mystery",
        "IMDB link": "https://www.imdb.com/title/tt26547864/?ref_=chtmvm_t_14"
    }
};

app.post('/addMovie', function (req, res) {
    // First read existing songs.
    fs.readFile(__dirname + "/songs.json", 'utf8', function (err, data) {
        var songs = JSON.parse(data);
        songs["song6"] = song["song6"];
        fs.writeFile(__dirname + "/songs.json", JSON.stringify(songs), 'utf8', function (err) {
            console.log("Song added:", song);
            res.end(JSON.stringify(songs));
        });
    });
});

app.get('/:id', function (req, res) {
    // First read existing songs.
    fs.readFile(__dirname + "/movies.json", 'utf8', function (err, data) {
        var movies = JSON.parse(data);
        var movie = movies["movie" + req.params.id];
        console.log(movie);
        res.end(JSON.stringify(movie));
    });
});

app.delete('/deleteMovie/:id', function (req, res) {
    // First read existing songs.
    fs.readFile(__dirname + "/movie.json", 'utf8', function (err, data) {
        var movies = JSON.parse(data);
        var idToDelete = req.params.id;
        if (movies["movie" + idToDelete]) {
            delete movies["movie" + idToDelete];
            fs.writeFile(__dirname + "/movies.json", JSON.stringify(movies), 'utf8', function (err) {
                console.log("Movie with ID " + idToDelete + " deleted.");
                res.end(JSON.stringify(movies));
            });
        } else {
            res.status(404).send("Movie not found");
        }
    });
});
