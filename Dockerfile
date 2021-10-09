ARG VERSI=1.1.7

FROM python:3.8.2-slim

ARG VERSI

WORKDIR /project

RUN pip install "poetry==$VERSI"

COPY poetry.lock pyproject.toml ./

RUN poetry config virtualenvs.create false

RUN poetry install

EXPOSE 5000

COPY book_bank .

COPY entrypoint.sh .

ENV FLASK_APP=/project/book_bank/app

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

