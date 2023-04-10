$(document).ready(function () {
   getQuote(); // initial quote on page load
   $('#new-quote').click(getQuote); // fetch new quote on button click
   $('#tweet-quote').click(tweetQuote); // tweet current quote on button click
   $('#copy-quote').click(copyQuote); // copy current quote on button click
});

function getQuote() {
   $.ajax({
      url: 'https://api.quotable.io/random',
      success: function (data) {
         var quoteText = '"' + data.content + '"' + ' - ' + data.author;
         $('#text').html('<p>&ldquo;' + data.content + '&rdquo;</p>');
         $('#author').html('<p>- ' + data.author + '</p>');
         $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(quoteText));
      },
      cache: false
   });
}
$('#speak-quote').click(function () {
   const quoteText = $('#text p').text();
   const authorText = $('#author p').text();
   const quote = quoteText + " by " + authorText;
   speak(quote);
});

function tweetQuote() {
   var href = $(this).attr('href');
   window.open(href, 'Share', 'width=550,height=300,toolbar=0,menubar=0,location=0,status=0');
   return false;
}

function copyQuote() {
   var text = $('#text').text().trim();
   var author = $('#author').text().trim(); // new line to get author text
   if (text) {
      var $temp = $('<textarea>');
      $('body').append($temp);
      $temp.val('"' + text + '" - ' + author).select(); // modify copied text to include author
      document.execCommand('copy');
      $temp.remove();
      alert('The Quote has been copied to clipboard!');
   }
}

function speak(text) {
   const utterance = new SpeechSynthesisUtterance(text);
   speechSynthesis.speak(utterance);
}                   