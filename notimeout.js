setTimeout(() => {
    var decodeEntities = (function() {
        // this prevents any overhead from creating the object each time
        var element = document.createElement('div');
      
        function decodeHTMLEntities (str) {
          if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
          }
      
          return str;
        }
      
        return decodeHTMLEntities;
    })();
    
    var data = $('[data-testid="question_box"]').attr('data-z');
    var objData = JSON.parse(decodeURIComponent(data));
    var respostas = [];
    
    objData.responses.forEach(function(a) {
        var decoda = decodeEntities(a.content);
        respostas.push(decoda);
    });
    
    $('[data-testid="unlock_section_wrapper"]').remove()
    $('[data-testid="answer_box_below_blockade"]').remove()
    $(".brn-qpage-next-dummy-unlock-section__button-wrapper").parent().remove();
    $('[data-testid="answer_box_content"]').parent().removeClass('AnswerBoxLayout-module__contentBlocked--MdVKu AnswerBoxLayout-module__contentGradient--QQZqs');
    
    $('[data-testid="answer_box_wrapper"]').each(function(i) {
        if($(this).find('[data-testid="answer_box_text"]').length) { 
            $(this).find('[data-testid="answer_box_text"]').text(respostas[i]) 
        } else {
            $(`<div data-testid="answer_box_text" class="sg-text sg-text--break-words AnswerBoxContent-module__richContent--XAbww js-answer-content AnswerBoxLayout-module__content--bMldb">${respostas[i]}</div>`)
            .insertAfter($(this).find('div:eq(3)'));
        } 
    });
}, 5000);