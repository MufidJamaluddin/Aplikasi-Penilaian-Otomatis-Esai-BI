from ujian_app import app, excel

if __name__ == "__main__":
    excel.init_excel(app)
    app.run(port=5000)