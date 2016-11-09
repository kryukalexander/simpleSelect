(function( $ ) {
    $.fn.simpleSelect = function() {

        function createSelectors(elem){
            var parentOptions = elem.find("option");
            var name = elem.attr("name");
            var newSS = document.createElement("div");
            var newSS_display = document.createElement("button");
            var newSS_active = document.createElement("div");
            var newSS_options = document.createElement("div");

            if ( !elem.attr("multiple") ) {
                newSS.classList.add("ss-container");
                $(newSS).attr("data-name", name);
                $(newSS).attr("data-selected", "");
                newSS_display.classList.add("ss-display");
                newSS_active.classList.add("ss-active");
                newSS_options.classList.add("ss-options");
                newSS_display.appendChild(newSS_active);
                newSS.appendChild(newSS_display);
                newSS.appendChild(newSS_options);
                $(newSS).insertAfter(elem);
                $(parentOptions).each( function(){
                    createOption( $(this), newSS_options );
                } );
                setValue(0, newSS);
                elem.hide();
            }
        }

        function createOption(elem, container){
            var content = elem.html();
            var value = elem.val();
            var newSS_option = document.createElement("div");
            newSS_option.classList.add("ss-options-item");
            $(newSS_option).attr("data-value", value);
            $(newSS_option).html(content);
            $(newSS_option).attr("tabindex", "-1");
            container.append(newSS_option);
        }

        function setValue(x, select) {

            var option = $(select).find(".ss-options-item");
            var display = $(select).find(".ss-active");
            var selval;

            if ( Number.isInteger(x) ) {
                var val = option.eq(x).html();
                $(option).eq(x).addClass("selected");
                selval = option.eq(x).attr('data-value');
            } else {
                val = $(select).find('[data-value="' + x + '"]').html();
                $(select).find('[data-value="' + x + '"]').addClass("selected");
                selval = x;
            }

            $(display).html(val);
            $(select).attr("data-selected", selval);
        }

        this.each(function(){
            createSelectors( $(this) )
        });

        $(".ss-display").click(function(){
            var isOpened = $(this).parent().hasClass("opened");
            $(".opened").removeClass("opened");

            if (!isOpened) {
                $(this).parent().addClass("opened");
            }
        });

        $(document).click(function (e){
            var selector = $(".ss-container");
            if (!selector.is(e.target) && selector.has(e.target).length === 0) {
                $(".opened").removeClass("opened");
            }
        });

        $(document).on("keyup", function(e){
           if (e.keyCode == 27) { $(".opened").removeClass("opened"); }
        });

        $("*").on("focus", function(e){
            $(".opened").removeClass("opened");
        });

        $(".ss-options-item").click(function(){

            var isSelected = $(this).hasClass("selected");
            var ss = $(this).closest('.ss-container');
            var button = $(ss).find(".ss-display");

            if (isSelected) {
                return false;
            } else {


                $(ss).find(".selected").removeClass("selected");
                $(this).addClass("selected");
                var value = $(this).attr("data-value");
                var name = $(ss).attr('data-name');
                setValue(value, ss);
                $('[name="' + name + '"]').val( value );
                $(ss).removeClass("opened");
            }

            button.focus();

        });

        $("select").change(function(){
            var name = $(this).attr('name');
            setValue( $(this).val(), $('[data-name="' + name + '"]') )
        });

        //todo keyboard arrows for options select

    };
})(jQuery);

