var parent = $('.ui.container.grid > .ui.row');
var index = Math.floor(Math.random() * 18);
var part1 = '<iframe\ width="640"\ height="360"\ src="https://www.youtube.com/embed/videoseries?list=PLGVZCDnMOq0rjkF7p_F4qtaVJQnjK1oKT&index=';
var part2 = '"\ frameborder="0"\ allowfullscreen></iframe>';
var element = part1 + index + part2;
var $ele = $(element);
$ele.insertAfter(parent);
