include Nanoc::Helpers::Blogging
include Nanoc::Helpers::LinkTo

def previous_link
  prev_index = sorted_articles.index(@item) + 1
  prev_article = sorted_articles[prev_index]
  if prev_article.nil?
    link_to("Archive", "/blog", :class => "item", :title => "Archive")
  else
    title = prev_article[:title]
    link_to("Prev", prev_article.path, :class => "active red item", :title => title)
  end
end

def next_link
  next_index = sorted_articles.index(@item) - 1
  if next_index < 0
    link_to("Archive", "/blog", :class => "item", :title => "Archive")
  else
    post = sorted_articles[next_index]
    title = post[:title]
    link_to("Next", post.path, :class => "active green item", :title => title)
  end
end

def sorted_tweet
  sorted = @items.find_all("/tweet/*.org").sort_by {|k| k[:created_at]}.reverse
end

def random_color
  colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
  random_color = colors.sample
end
