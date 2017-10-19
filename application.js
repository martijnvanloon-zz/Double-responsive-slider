$(function() {
  // MMENU
  $("nav#mobilemenu").mmenu({
    navbar: {
      add: true,
      title: $("#menuTemplate").html()
    }
  });

  var api = $("nav#mobilemenu").data("mmenu");
  $(".closemobilemenu").click(function() {
    api.close();
  });
  // EINDE MMENU

  // STICKY
  $('[data-sticky="true"]').each(function() {
    $(this).sticky({
      topSpacing: $(this).data("sticky-offset") || 0,
      className: "fixed"
    });
  });
  // EINDE STICKY

  // scrollbar
  $('[data-scrollbar="true"]').each(function() {
    var $viewport = $(".viewport", this);
    var $columns = $(".slider-item", this);
    var $overview = $(".overview", this);
    var $this = $(this);

    $(window).on("load resize", function() {
      var height = 0;
      var width = 0;
      var totalwidth = 0;
      $columns.each(function() {
        var el = $(this);
        el.attr("style", "");
        if (el.outerHeight() > height) {
          height = el.outerHeight();
        }

        if (el.outerWidth() > width) {
          width = el.outerWidth();
        }

        totalwidth = totalwidth + width + 20;
      });
      $columns.height(height);
      $columns.width(width);

      $viewport.height(height);
      $overview.width(totalwidth);

      $this.tinyscrollbar({ axis: "x" });
    });
  });
  // EINDE scrollbar

  // BeforeAndAfter slider
  $('[data-BeforeAndAfter="true"]').each(function() {
    window.onload = beforeAfterSlider;
  });
  // EINDE BeforeAndAfter slider

  // Extend validation settings
  $("form").each(function() {
    if (!$(this).data("validator")) return false;

    var settings = $(this).data("validator").settings;

    settings.highlight = function(elem) {
      $(elem)
        .parent()
        .addClass("error")
        .removeClass("valid");
    };
    settings.unhighlight = function(elem) {
      $(elem)
        .parent()
        .removeClass("error")
        .addClass("valid");
    };
  });
});

//SHOWIMAGE NEWSPAGE
function showImage(imgName) {
  var $curImage = document.getElementById("currentImg");
  var $theSource = imgName;
  $curImage.src = $theSource;
  $curImage.alt = imgName;
  $curImage.title = imgName;
}
//EINDE SHOWIMAGE NEWSPAGE

// Register namespace
function registerNamespace(namespace, object) {
  var parts = namespace.split(".");
  var parent = window;

  for (var i = 0; i < parts.length; i++) {
    if (parent[parts[i]] === undefined || parent[parts[i]] === null) {
      parent[parts[i]] = {};
    }

    if (i === parts.length - 1) parent[parts[i]] = object;
    parent = parent[parts[i]];
  }
}
registerNamespace("web.utils.register", registerNamespace);

// interactieve blokken 
function drieBlokFunction() {
  //$(".move-block").on('mouseover', highlight(event));
  // select 3 blok
  var drieBlok = document.querySelectorAll(".move-block");

  function addEventListener(btns, event, fn) {
    for (var i = 0, len = btns.length; i < len; i++) {
      btns[i].addEventListener(event, fn, false);
    }
  }

  highlight = function (e) {
    // log the mouseenter target
    // remove class chosen from all 3 elements
    var chosen = document.querySelector(".chosen");
    chosen.classList.remove("chosen");
    // add class chosen to this element
    e.currentTarget.classList.add("chosen");

    visualChange.apply(this, arguments);
    visualChange(e);
  };

  addEventListener(drieBlok, "click", highlight);
};

visualChange = function(e) {
  var visual = document.querySelector(".visual.big img");
  if (e.currentTarget.classList.contains("block-1")) {
    visual.src = "/images/home-project.jpg";
  }
  if (e.currentTarget.classList.contains("block-2")) {
    visual.src = "/images/home-ergonomie.jpg";
  }
  if (e.currentTarget.classList.contains("block-3")) {
    visual.src = "/images/home-producten.jpg";
  }
};

visualChangeMobile = function(e) {
  var visual = document.querySelector(".visual.big img");
  if (e == 0 ) {
    visual.src = "/images/home-project.jpg";
  }
  if (e == 1 ) {
    visual.src = "/images/home-ergonomie.jpg";
  }
  if (e == 2 ) {
    visual.src = "/images/home-producten.jpg";
  }
};

function unSlick()
{
  if (document.querySelector('#drieBlocks.slick-slider')) {
    $("#drieBlocks").slick("unslick");
  }
  else {
    //
  }
};


(function() {
  if (matchMedia) {
    // check if the window is more or less then 600px
    const mq = window.matchMedia("(max-width: 991px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  // change the style of two elements depending on the size of the window
  function WidthChange(mq) {
	if (mq.matches) {
		$("#drieBlocks").slick({
			nextArrow: '<i class="arrow-sprite arrow-right-light"></i>',
			prevArrow: '<i class="arrow-sprite arrow-left-light"></i>',
			speed: 150
    });
    $("#drieBlocks").on("afterChange", function(
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      visualChangeMobile(currentSlide);
    });
    } else {
    drieBlokFunction();
      unSlick();
    }
  }
})();



