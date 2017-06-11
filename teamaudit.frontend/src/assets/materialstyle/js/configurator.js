function widthOptions() {
    function o(o) {
        "boxed" === o ? $("#ms-boxed").prop("disabled", !1) : $("#ms-boxed").prop("disabled", !0),
        $.cookie("ms-width", o, {
            expires: 7,
            path: "/"
        })
    }
    if ($("#ms-boxed").prop("disabled", !0),
    $.cookie("ms-width")) {
        var e = $.cookie("ms-width");
        o(e),
        $("#" + e + "Width").prop("checked", !0)
    }
    $("#boxed-config input").on("change", function() {
        optionWidth = $("input[name=customWidth]:checked", "#boxed-config").val(),
        o(optionWidth)
    })
}
function headerOptions() {
    function o(o, e) {
        c.removeClass("navbar-mode"),
        "hidden" == o ? s.removeClass("hidden") : s.removeClass("ms-header-" + o),
        "hidden" == e ? (s.addClass("hidden"),
        $("#noHeader").prop("checked", !0),
        c.addClass("navbar-mode")) : (s.addClass("ms-header-" + e),
        $("#" + e + "Header").prop("checked", !0)),
        a = e,
        $.cookie("ms-header-color", a, {
            expires: 7,
            path: "/"
        })
    }
    function e(o, e) {
        c.removeClass("ms-navbar-" + o),
        c.addClass("ms-navbar-" + e),
        i = e,
        $("#" + i + "Navbar").prop("checked", !0),
        $.cookie("ms-navbar-color", i, {
            expires: 7,
            path: "/"
        })
    }
    var a = "primary"
      , i = "primary"
      , n = a
      , r = i
      , s = $(".ms-header")
      , c = $(".ms-navbar");
    $.cookie("ms-header-color") && (n = $.cookie("ms-header-color")),
    $.cookie("ms-navbar-color") && (r = $.cookie("ms-navbar-color")),
    o(a, n),
    e(i, r),
    $("#header-config input").on("change", function() {
        optionColor = $("input[name=customHeader]:checked", "#header-config").val(),
        o(a, optionColor)
    }),
    $("#navbar-config input").on("change", function() {
        optionColor = $("input[name=customNavbar]:checked", "#navbar-config").val(),
        e(i, optionColor)
    })
}
function ColorOptions() {
    function o(o, e) {
        i.attr("href", a + "style." + o + "-" + e + ".css"),
        n.removeClass("active"),
        r.removeClass("active"),
        n = $("#color-options .ms-color-box-primary." + o),
        r = $("#grad-options .grad.c" + e),
        n.addClass("active"),
        r.addClass("active"),
        $.cookie("ms-color", o, {
            expires: 7,
            path: "/"
        }),
        $.cookie("ms-shine", e, {
            expires: 7,
            path: "/"
        })
    }
    var e = urlofdoc("app.js")
      , a = e + "css/"
      , i = $("link[href^= '" + a + "style']")
      , n = $("#color-options .ms-color-box-primary.active")
      , r = $("#grad-options .grad.active")
      , s = "light-blue"
      , c = 500;
    $.cookie("ms-color") && ($(".grad").removeClass(s),
    s = $.cookie("ms-color"),
    $.cookie("ms-shine") && (c = $.cookie("ms-shine")),
    o(s, c),
    $(".grad").addClass(s)),
    $("#color-options .ms-color-box-primary").click(function() {
        return $(".grad").removeClass(s),
        s = $(this).data("color"),
        $(".grad").addClass(s),
        o(s, 500),
        !1
    }),
    $("#grad-options .grad").click(function() {
        return c = $(this).data("shine"),
        o(s, c),
        !1
    })
}
function urlofdoc(o) {
    var e, a;
    return e = $("script[src*='app.js']").attr("src"),
    e.indexOf(o) >= 0 && (a = e.substring(0, e.indexOf(o) - 3)),
    a
}
function setActiveMenu() {
    var o = window.location.pathname
      , e = o.lastIndexOf("/") + 1
      , a = o.slice(e, o.indexOf("-", e));
    "" !== a && "index.htm" !== a || (a = "home");
    var i = $("*[data-name]");
    $.each(i, function(o, e) {
        $(e).parent().removeClass("active")
    }),
    $('*[data-name="' + a + '"]').parent().addClass("active")
}
$(document).ready(function() {
    setActiveMenu(),
    ColorOptions(),
    headerOptions(),
    widthOptions()
});