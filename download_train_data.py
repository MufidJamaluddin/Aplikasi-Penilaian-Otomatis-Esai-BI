import os
import nltk


def download_train_data():
    root_path = os.path.dirname(os.path.realpath(__file__))
    train_data_path = os.path.join(root_path, "train_data")

    nltk.download('punkt', download_dir=train_data_path)
    nltk.download('stopwords', download_dir=train_data_path)


download_train_data()
