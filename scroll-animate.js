'use strict';
// ECMAScript 2015
//Not suport Internet Explorer
(function ($, window) {

    class ScrollAnimate{
        /**
         * Init parrent selector with default class values for <div>s
         * @param selector
         */
        constructor(selector) {
            this.selector = selector;
            this.img = selector.find('img');
            this.initDefaultValues();

        }

        /**
         * Init values
         * return void
         */
        initDefaultValues(){

            this.miniHuiy = "mini-huiy-1px"; //selector for defined current position of scroll
            this.animateScrollEffect = 'animate-scroll-effect'; //wrap img
            this.lastScrollTop = 0;
            
            this.scrollNoEffect = 'scroll-no-effect_do-animate'; //class without animation
            this.scrollDoEffect = 'scroll-effect_do-animate'; //class with animation
        }

        /**
         * Detect element on visible (screen)
         * @param elem
         * @returns {boolean|boolean}
         *
         */
        isScrolledIntoView(elem){
            let docViewTop = $(window).scrollTop();
            let docViewBottom = docViewTop + $(window).height();

            let elemTop = $(elem).offset().top;
            let elemBottom = elemTop + $(elem).height();
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }


        /**
         * Listener for window.prototype.scroll
         */
        eventListenerScroll(){
         
            let $this = this;
            let st = window.pageYOffset || document.documentElement.scrollTop;
            
            if(st > this.lastScrollTop){
                $('.'+this.miniHuiy).each(function () {
                    let animateEffect = $(this).parent();
                    if ($this.isScrolledIntoView(this) === true && !($(animateEffect).hasClass($this.scrollNoEffect)) ) {
                        $(animateEffect).addClass($this.scrollDoEffect);
                    } else {
                        $(animateEffect).removeClass($this.scrollDoEffect);
                    }
                });
            }
            this.lastScrollTop = st <= 0 ? 0 : st;
        }

        /**
         * Create wrap and prepend selectors
         */
        prepare(){
            //let st = window.pageYOffset || document.documentElement.scrollTop;
            this.img.wrap("<div class = ''"+this.animateScrollEffect+"'>");
            $("."+this.animateScrollEffect).prepend("<div class='"+this.miniHuiy+"'></div>");
        }
        /**
         * Listener for window.prototype.DOMContentLoaded
         */
        eventListenerDOMContentLoaded(){
            let $this = this;
            
            $('.'+$this.miniHuiy).each(function () {
                let animateEffect = $(this).parent();
                if ($this.isScrolledIntoView(this) === true && window.pageYOffset < 50){
                    $(animateEffect).addClass($this.scrollDoEffect);
                }
                $(animateEffect).addClass($this.scrollDoEffect);
            });
        }


    }


    $.fn.ScrollAnimate = function () {

        let scrollAnimate = new ScrollAnimate($(this));
        scrollAnimate.prepare();

        window.addEventListener('scroll', scrollAnimate.eventListenerScroll, false);
        window.addEventListener('DOMContentLoaded', scrollAnimate.eventListenerDOMContentLoaded, false);

    };
})(jQuery, window);

