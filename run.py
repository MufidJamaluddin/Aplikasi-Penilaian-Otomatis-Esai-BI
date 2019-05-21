from ujian_app import make_app

if __name__ == "__main__":
    app = make_app()
    app.run(port=5000)