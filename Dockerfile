FROM ruby:2.3

MAINTAINER Bingo Du <tarvos21@gmail.com>

# Install vim and less
RUN apt-get update && apt-get install --yes vim less

RUN mkdir -p /data/

COPY Gemfile /data/
COPY Gemfile.lock /data/

WORKDIR /data/

RUN bundle install

VOLUME /data/

ENTRYPOINT ["bundle", "exec"]

CMD ["guard"]

WORKDIR /data/
