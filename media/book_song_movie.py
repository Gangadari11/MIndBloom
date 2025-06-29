import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# === Route 1: /books ===
@app.route('/books', methods=['GET'])
def get_books():
    query = request.args.get("q", "calm self help")
    max_results = 8
    url = f"https://www.googleapis.com/books/v1/volumes?q={query}&maxResults={max_results}"

    try:
        res = requests.get(url)
        books = res.json().get("items", [])

        results = []
        for book in books:
            info = book.get("volumeInfo", {})
            results.append({
                "title": info.get("title"),
                "authors": info.get("authors", []),
                "description": info.get("description", "No description available."),
                "categories": info.get("categories", []),
                "previewLink": info.get("previewLink"),
                "thumbnail": info.get("imageLinks", {}).get("thumbnail", "")
            })
        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === Route 2: /songs ===
@app.route('/songs', methods=['GET'])
def get_songs():
    query = request.args.get("q", "calm")
    url = f"https://api.deezer.com/search?q={query}"

    try:
        res = requests.get(url)
        res.raise_for_status()
        results = res.json().get("data", [])

        songs = []
        for song in results[:12]:  # Limit to 12 songs
            songs.append({
                "trackName": song.get("title"),
                "artistName": song["artist"].get("name"),
                "album": song["album"].get("title"),
                "artwork": song["album"].get("cover_medium"),
                "previewUrl": song.get("preview")
            })

        return jsonify(songs)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === Route 3: /movies ===
@app.route('/movies', methods=['GET'])
def get_movies():
    query = request.args.get("q", "calm")
    api_key = api_key = os.getenv("MOVIE_API")  # 🔁 Replace with your real TMDb API key
    url = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={query}"

    try:
        res = requests.get(url)
        res.raise_for_status()
        results = res.json().get("results", [])

        movies = []
        for movie in results[:10]:  # Limit to 10
            movies.append({
                "title": movie.get("title"),
                "overview": movie.get("overview", "No description available."),
                "poster": f"https://image.tmdb.org/t/p/w300{movie['poster_path']}" if movie.get("poster_path") else "",
                "release_date": movie.get("release_date", "Unknown"),
                "rating": movie.get("vote_average", "N/A")
            })

        return jsonify(movies)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# === Main run ===
if __name__ == '__main__':
    app.run(debug=True)
