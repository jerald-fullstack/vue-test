$(document).ready(function () {

    $("#SvgSymbols").load("/assets/Images/svg/svg-symbols.svg"); 

    $(document).on("click", function (e) {
        $("body").removeClass("userNavOpen mySavesNavOpen");
    });

    /*
     * 
     * Stop fancy-box windows from closing menus
     *
    */
    $(document).on("click", ".popupBox", function (e) {
        e.stopPropagation();
    });

    /*
     * 
     * User Icon/Name Drop Down funcitons
     *
    */
    //open/close
    $(document).on("click", ".userNavTrigger", function (e) {

        e.preventDefault();
        e.stopPropagation();
        $("body").toggleClass("userNavOpen");

    });
    //close
    $(document).on("click", ".userNav .close", function (e) {

        e.preventDefault();
        $("body").removeClass("userNavOpen");

    });

    /*
     *
     * 'My Saves' Menu funcitons
     *
    */
    //open/close
    $(document).on("click", ".mySavesNavTrigger", function (e) {

        e.preventDefault();
        $("body").toggleClass("mySavesNavOpen");
        $("body").removeClass("customiseNavOpen");
        $("body").removeClass("floorNavOpen");

    });
    //stop event bubbling on 'My Saves' interaction
    $(document).on("click", ".mySavesNav", function (e) {
        e.stopPropagation();
    });
    //close
    $(document).on("click", ".mySavesNav .close", function (e) {

        e.preventDefault();
        $("body").removeClass("mySavesNavOpen");

    });

    /*
     * 
     * Saved items
     *
    */
    //open/close
    $(document).on("click", ".savedItem", function (e) {

        $(this).parent().find(".savedItem").removeClass("active");
        $(this).addClass("active");

    });

    //remove
    $(document).on("click", ".savedItem .remove", function (e) {
        e.stopPropagation();

        $(this).parent().toggleClass("confirmRemove");
    });
    $(document).on("click", ".savedItem .removeConfirm", function (e) {
        e.stopPropagation();

        $(this).parent().addClass("removed");
        $(".savedItem").removeClass("active");
    });

    /*
     *
     * Save Progress button funcitons
     *
    */
    $(".progressBtn, .resetBtn").click(function (e) {
        e.preventDefault();

        var progress = 100; //update this value with actual 'save' progress

        updateProgressButton($(this), progress);
    });


    /*
     *
     * Resize-End functionality
     *
    */
    var rtime = new Date(1, 1, 2000, 12, 00, 00);
    var timeout = false;
    var delta = 100;
    $(window).on("resize", function () {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
        }

        //on every resize (not debounced)
        CalcMagicLine($(".finishNav, .floorNav").find(" > ul > li.active"));
    });

    function resizeend() {
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;

            //on resize-end do...
        }
    }

    //launch layout popup
    $(document).on("click", ".layout, .extrasList .edit, .extrasList .configure a", function (e) {

        var $popupId = $(this).data("src");
        var $popup = $($popupId);
        var layoutStep = $popup.data("layout-step");

        $popup.attr("data-layout-step", 0);
        $popup.find(".layoutNav [data-layout-step]").removeClass("active");
        $popup.find(".layoutNav [data-layout-step=" + parseInt(layoutStep) + "]").addClass("active");

        $("[data-layout-screen]", $popup).removeClass("active");
        $("[data-layout-screen=0]", $popup).addClass("active");
        //$(".layoutsPopup .stepBtn").html("<span>Start <span class=\"arrow\"></span></span>");
        $(".stepBtn", $popup).html("<span>Next <span class=\"arrow\"></span></span>");

        $(".layoutNav", $popup).each(function () {
            CalcMagicLine($("ul > li.active", $popup));
        });

        if ($popup.find(".layoutOption[data-layout-screen=" + (parseInt(layoutStep)) + "] input[type=radio]:checked").length <= 0) {
            $(".stepBtn", $popup).addClass("inactive");
        } else {
            $(".stepBtn", $popup).removeClass("inactive");
        }
    });

    //launch layout option info area
    $(".layoutItem .more a").click(function () {
        var $popup = $(this).closest(".layoutsPopup");
        var layoutStep = $popup.attr("data-layout-step");

        $(".fancybox-close-small", $popup).addClass("hidden");

        $(".layoutOptionInfoClose", $popup).addClass("active");

        $(".layoutItem .more a", $popup).removeClass("active");
        $(this).addClass("active");

        $(".layoutOptionInfo").removeClass("active");
        $("[data-option-info-item='" + $(this).data("option-info-item") + "']", $popup.find(".layoutLeft [data-layout-screen=" + parseInt(layoutStep) + "]")).addClass("active");
    });

    //close layout option info area
    $(".layoutOptionInfoClose").click(function () {
        var $popup = $(this).closest(".layoutsPopup");
        $(".fancybox-close-small", $popup).removeClass("hidden");
        $(".layoutOptionInfoClose", $popup).removeClass("active");
        $(".layoutItem .more a", $popup).removeClass("active");
        $(".layoutOptionInfo").removeClass("active");
    });

    //launch layout option info area
    $(".layoutItem .edit a").click(function () {
        var $popup = $(this).closest(".layoutsPopup");
        var layoutStep = $(this).attr("data-layout-edit-step");
        var totalSteps = $popup.find(".layoutScreens .layoutOption").length - 1;

        $popup.attr("data-layout-step", parseInt(layoutStep));

        setTimeout(function () {
            $popup.find("[data-layout-screen]").removeClass("active");
            $popup.find("[data-layout-screen=" + parseInt(layoutStep) + "]").addClass("active");
            if (layoutStep == totalSteps) {
                $popup.find(".layoutNav").addClass("hidden");
            }
            else {
                $popup.find(".layoutNav").removeClass("hidden");
                $popup.find(".layoutNav [data-layout-step]").removeClass("active");
                $popup.find(".layoutNav [data-layout-step=" + parseInt(layoutStep) + "]").addClass("active");
                CalcMagicLine($(".layoutNav ul > li.active", $popup));
            }
        }, 500);
        updateStepButton($(".popupAction", $popup).first(), "Next");
    });

    //go to next layout step
    $(".layoutsPopup .stepBtn").click(function (e) {
        e.preventDefault();

        var nextStepText = "";
        var $popup = $(this).closest(".layoutsPopup");
        var layoutStep = $popup.attr("data-layout-step");
        var totalSteps = $popup.find(".layoutRight .layoutScreens .layoutOption").length - 1;

        if (layoutStep == totalSteps) {
            nextStepText = "Confirm";
        }
        else if (layoutStep > totalSteps) {
            setTimeout(function () {
                $.fancybox.close();
                $("body").removeClass("customiseNavLevel1Open");
                $(".infoPin").removeClass("active");
                $(".l1Item, .l2Item").removeClass("open");
                return false;
            }, 500);
        }
        else {
            if ($popup.find(".layoutOption[data-layout-screen=" + (parseInt(layoutStep) + 1) + "] input[type=radio]:checked").length <= 0) {
                $(".stepBtn", $popup).addClass("inactive");
            }

            nextStepText = "Next";
        }

        $popup.attr("data-layout-step", (parseInt(layoutStep) + 1));
        setTimeout(function () {
            $popup.find("[data-layout-screen]").removeClass("active");
            $popup.find("[data-layout-screen=" + (parseInt(layoutStep) + 1) + "]").addClass("active");

            $(".layoutOptionInfoClose", $popup).removeClass("active");
            $(".layoutItem .more a", $popup).removeClass("active");
            $(".layoutOptionInfo").removeClass("active");

            if (layoutStep == totalSteps) {
                $popup.find(".layoutNav").addClass("hidden");
            }
            else {
                $popup.find(".layoutNav").removeClass("hidden");
                $popup.find(".layoutNav [data-layout-step]").removeClass("active");
                $popup.find(".layoutNav [data-layout-step=" + (parseInt(layoutStep) + 1) + "]").addClass("active");
                CalcMagicLine($(".layoutNav ul > li.active", $popup));
            }
        }, 500);
        updateStepButton($(this), nextStepText);
    });

    //go to previous layout step
    $(".layoutsPopup .back .button").click(function (e) {
        e.preventDefault();

        var $popup = $(this).closest(".layoutsPopup");
        var layoutStep = $popup.attr("data-layout-step");
        var totalSteps = $popup.find(".layoutScreens .layoutOption").length - 1;

        if (layoutStep == 0) {
            $.fancybox.close();
            return false;
        }
        //else if (layoutStep == 1) {
        //    var nextStepText = "Start";
        //}
        else {
            var nextStepText = "Next";
        }
        $popup.attr("data-layout-step", (parseInt(layoutStep) - 1));
        setTimeout(function () {
            $popup.find("[data-layout-screen]").removeClass("active");
            $popup.find("[data-layout-screen=" + (parseInt(layoutStep) - 1) + "]").addClass("active");
            if (layoutStep == totalSteps) {
                $popup.find(".layoutNav").addClass("hidden");
            }
            else {
                $popup.find(".layoutNav").removeClass("hidden");
                $popup.find(".layoutNav [data-layout-step]").removeClass("active");
                $popup.find(".layoutNav [data-layout-step=" + (parseInt(layoutStep) - 1) + "]").addClass("active");
                CalcMagicLine($(".layoutNav ul > li.active", $popup));
            }
        }, 500);
        updateStepButton($(".popupAction", $popup).first(), nextStepText);
    });

    //Show next button
    $(".layoutItem input[type=radio]").on("change", function () {
        var $popup = $(this).closest(".layoutsPopup");
        var layoutStep = $popup.attr("data-layout-step");

        $(".stepBtn", $popup).removeClass("inactive");
        $(".layoutOptionInfoClose", $popup).click();

        var leftImgUrl = $(this).data("layout-screen-url");
        if (leftImgUrl !== undefined) {
            $popup.find(".layoutLeft [data-layout-screen=" + parseInt(layoutStep) + "]").css({ backgroundImage: "url('" + leftImgUrl + "')" });
        }
    });
});

$(window).on("load", function () {

    //Magic nav line
    InitMagicLine();

});

function updateProgressButton(btn, progress) {

    if (!btn.is(".loading") && !btn.is(".inProgress") && !btn.is(".saved")) {

        btn.addClass("loading");

        setTimeout(function () {

            btn.addClass("inProgress");
            btn.attr("style", "background-position: -" + progress + "% 0%;");

            if (progress == 100) {

                setTimeout(function () {
                    btn.addClass("saved");
                    btn.removeClass("inProgress loading");

                    setTimeout(function () {
                        btn.removeClass("saved");
                        btn.attr("style", "background-position: -0% 0%;");
                    }, 2000);

                }, 2000);

            }
        }, 500);
    }
}

function updateStepButton(btn, nextStepText) {

    if (!btn.is(".inProgress")) {

        btn.addClass("inProgress");

        setTimeout(function () {

            btn.attr("style", "background-position: -100% 0%;");
            btn.html("<span>" + nextStepText + " <span class=\"arrow\"></span></span>");

            setTimeout(function () {
                btn.addClass("finished");

                setTimeout(function () {
                    btn.removeClass("inProgress finished");
                }, 300);

            }, 500);

        }, 500);
    }
}

function InitMagicLine() {

    $(".layoutNav, .finishNav, .floorNav").each(function () {

        CalcMagicLine($(this).find("ul > li.active"));

        $(this).find("ul > li.finishNavOption > a, ul > li > a").click(function () {
            $(this).closest(".layoutNav, .finishNav, .floorNav").find("ul > li.active").removeClass("active");
            $(this).parent().addClass("active");

            CalcMagicLine($(this).parent());
        });

        $(this).find("ul > li").hover(function () {
            CalcMagicLine($(this));
        }, function () {
            if ($(this).closest(".layoutNav, .finishNav, .floorNav").find("ul > li.active").length <= 0) {
                $(this).closest(".layoutNav, .finishNav, .floorNav").find("ul > li.magicLine").removeClass("visible");
            }
            else {
                CalcMagicLine($(this).closest(".layoutNav, .finishNav, .floorNav").find("ul > li.active"));
            }
        });

    });
}

function CalcMagicLine($activeElem) {

    if ($activeElem.length > 0) {

        var $lineWidth = 30,
            $origLeftPos = ($activeElem.position().left + (($activeElem.outerWidth() / 2) - ($lineWidth / 2)));

        if ($activeElem.closest(".layoutNav, .finishNav, .floorNav").find("ul > li.magicLine").length <= 0) {
            $activeElem.closest(".layoutNav, .finishNav, .floorNav").find("ul").append("<li class='magicLine'>&nbsp;</li>");
        }

        $activeElem.closest(".layoutNav, .finishNav, .floorNav").find("ul > li.magicLine").addClass("visible");
        $activeElem.closest(".layoutNav, .finishNav, .floorNav").find("ul > li.magicLine").css({ width: $lineWidth, left: $origLeftPos })
    }
}