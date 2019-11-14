$(document).ready(function () {

    /*
     * Loading overlay trigger
     */
    $(".configDecoration .toggle input").change(function () {
        $(".updatePanel").removeClass("hidden");
        setTimeout(function () {
            $(".updatePanel").addClass("hidden");
        }, 5000);
    });

    /*
     *
     * 'Customise' Menu funcitons
     *
    */
    //open/close
    $(document).on("click", ".customiseNavTrigger", function (e) {

        e.preventDefault();
        e.stopPropagation();
        if (!$("body").hasClass("customiseNavOpen")) {
            $("body").addClass("customiseNavOpen");
            $("body").removeClass("mySavesNavOpen");
        }
        else {
            if ($("body").hasClass("customiseNavLevel1Open")) {
                $(".infoPin").removeClass("active hover");
                $("body").removeClass("customiseNavLevel1Open");
                $(".l1Item, .l2Item").removeClass("open");
            }
            else {
                $("body").removeClass("customiseNavOpen");
                $(".infoPin").removeClass("active hover");
            }
        }

    });
    setTimeout(function () {
        $(".customiseNavTrigger").trigger("click");
    }, 500);

    //stop event bubbling on 'Select a Room' interaction
    $(document).on("click", ".customiseNav", function (e) {
        e.stopPropagation();
    });

    //level 1 highlight on pin hover
    $(".infoPin").hover(function () {
        $(".l1Item").removeClass("hover");
        $(".l1Item[data-config-section-id='" + $(this).data("config-section-id") + "']").addClass("hover");
        $(".l2Item[data-config-section-id='" + $(this).data("config-section-id") + "']").parents(".l1Item").addClass("hover");
    }, function () {
        $(".l1Item").removeClass("hover");
    });

    //open level 1 item
    $(document).on("click", ".l1ItemTrigger", function (e) {

        $("body").toggleClass("customiseNavLevel1Open");
        $(this).parent().toggleClass("open");

        $(".infoPin").removeClass("active hover");
        $(".infoPin[data-config-section-id='" + $(this).parent().data("config-section-id") + "']").addClass("active");

    });
    //close level 1 item
    $(document).on("click", ".l1Item .l1ItemInner > .close", function (e) {

        $("body").toggleClass("customiseNavLevel1Open");
        $(this).parents(".l1Item").removeClass("open");
        $(this).parents(".l1Item").find(".l2Item").removeClass("open");
        $(".infoPin").removeClass("active hover");

    });
    //close level 2 item
    $(document).on("click", ".l2Item > .close", function (e) {

        e.stopPropagation();
        $(this).parents(".l2Item").first().removeClass("open");
        $(this).parents(".l2Item").first().find(".l2Item").removeClass("open");
        $(".infoPin").removeClass("active hover");

    });

    //select an option
    $(document).on("click", ".option:not(.layout)", function (e) {

        e.stopPropagation();

        if ($(this).find(".option").length == 0) {
            $(this).parents(".optionGroup, .l1Item").find(".option").removeClass("selected");
            $(this).addClass("selected");
            $(this).closest(".l1Item, .l2Item").find('.confirm').first().addClass("active");
            HideInfoModal();
        }
        else {
            $(this).find(".l2Item").first().addClass("open"); //open item
        }

    });

    $(document).on({
        mouseenter: function () {
            $(".infoPin").removeClass("hover");
            $(".infoPin[data-config-section-id='" + $(this).find(".l2Item").first().data("config-section-id") + "']").addClass("hover");
        },
        mouseleave: function () {
            $(".infoPin").removeClass("hover");
        },
        click: function () {
            $(".infoPin[data-config-section-id='" + $(this).find(".l2Item").first().data("config-section-id") + "']").addClass("active");
        }
    }, ".optionGroup");

    //click confirm
    $(document).on("click", ".customiseNav .confirm", function (e) {

        e.stopPropagation();

        $("body").removeClass("customiseNavLevel1Open");
        $(".l1Item, .l2Item").removeClass("open");

        $(this).removeClass('active');

    });
    
    /* Wardrobe selection/config */
    //launch wardrobe popup
    $(document).on("click", ".wardrobe", function (e) {

        $(".finishNav").each(function () {
            CalcMagicLine($(this).find("ul > li.active"));
        });


        $("#Wardrobes--hinged, #Wardrobes--sliding").attr("data-wardrobes-step", 0);
        $("#Wardrobes--hinged, #Wardrobes--sliding").find("[data-wardrobes-screen]").removeClass("active");
        $("#Wardrobes--hinged, #Wardrobes--sliding").find("[data-wardrobes-screen=0]").addClass("active");
        $(".wardrobesPopup .stepBtn").html("<span>Continue <span class=\"arrow\"></span></span>");
    });

    //go to next layout step
    $(".wardrobesPopup .stepBtn").click(function (e) {
        e.preventDefault();
        var nextStepText = "";
        var wardrobeStep = $(this).closest("#Wardrobes--hinged, #Wardrobes--sliding").attr("data-wardrobes-step");
        var totalSteps = $(this).closest("#Wardrobes--hinged, #Wardrobes--sliding").find(".wardrobesScreens .wardrobesFinish").length - 1;

        if (wardrobeStep == totalSteps) {
            nextStepText = "Confirm";
        }
        else if (wardrobeStep > totalSteps) {
            setTimeout(function () {
                $.fancybox.close();
                return false;
            }, 500);
        }
        else {
            nextStepText = "Next";
        }
        $("#Wardrobes--hinged, #Wardrobes--sliding").attr("data-wardrobes-step", (parseInt(wardrobeStep) + 1));
        setTimeout(function () {
            $("#Wardrobes--hinged, #Wardrobes--sliding").find("[data-wardrobes-screen]").removeClass("active");
            $("#Wardrobes--hinged, #Wardrobes--sliding").find("[data-wardrobes-screen=" + (parseInt(wardrobeStep) + 1) + "]").addClass("active");
        }, 500);
        updateStepButton($(this), nextStepText);
    });

    //select style
    $('.wardrobesStyle').click(function (e) {
        e.preventDefault();

        $(this).closest("[data-wardrobes-screen]").find(".wardrobesStyle").removeClass("active");
        $(this).addClass("active");
    });

    //select finish
    $('.finishOption').click(function (e) {
        e.preventDefault();

        $(this).closest("[data-wardrobes-screen]").find(".finishOption").removeClass("active");
        $(this).addClass("active");
    });

    //confirm section edit button
    $('#Wardrobes--hinged .wardrobesConfirmItem .edit').click(function (e) {
        var nextStepText = "";
        var stepToMoveTo = $(this).closest(".wardrobesConfirmItem").attr("data-edit-step");

        if (stepToMoveTo == 0) {
            $.fancybox.close();
            return false;
        }
        else if (stepToMoveTo == 1) {
            nextStepText = "Continue";
        }
        else {
            nextStepText = "Next";
        }
        $("#Wardrobes--hinged").attr("data-wardrobes-step", (parseInt(stepToMoveTo) - 1));
        setTimeout(function () {
            $("#Wardrobes--hinged").find("[data-wardrobes-screen]").removeClass("active");
            $("#Wardrobes--hinged").find("[data-wardrobes-screen=" + (parseInt(stepToMoveTo) - 1) + "]").addClass("active");
        }, 500);
        updateStepButton($("#Wardrobes--hinged.wardrobesPopup .popupAction").first(), nextStepText);
    });

    $('#Wardrobes--sliding .wardrobesConfirmItem .edit').click(function (e) {
        var nextStepText = "";
        var stepToMoveTo = $(this).closest(".wardrobesConfirmItem").attr("data-edit-step");

        if (stepToMoveTo == 0) {
            $.fancybox.close();
            return false;
        }
        else if (stepToMoveTo == 1) {
            nextStepText = "Continue";
        }
        else {
            nextStepText = "Next";
        }
        $("#Wardrobes--sliding").attr("data-wardrobes-step", (parseInt(stepToMoveTo) - 1));
        setTimeout(function () {
            $("#Wardrobes--sliding").find("[data-wardrobes-screen]").removeClass("active");
            $("#Wardrobes--sliding").find("[data-wardrobes-screen=" + (parseInt(stepToMoveTo) - 1) + "]").addClass("active");
        }, 500);
        updateStepButton($("#Wardrobes--sliding.wardrobesPopup .popupAction").first(), nextStepText);
    });

    ////go to previous layout step
    $("#Wardrobes--hinged.wardrobesPopup .back .button").click(function (e) {
        e.preventDefault();
        var nextStepText = "";

        var wardrobeStep = $("#Wardrobes--hinged").attr("data-wardrobes-step");

        if (wardrobeStep == 0) {
            $.fancybox.close();
            return false;
        }
        else if (wardrobeStep == 1) {
            nextStepText = "Continue";
        }
        else {
            nextStepText = "Next";
        }
        $("#Wardrobes--hinged").attr("data-wardrobes-step", (parseInt(wardrobeStep) - 1));
        setTimeout(function () {
            $("#Wardrobes--hinged").find("[data-wardrobes-screen]").removeClass("active");
            $("#Wardrobes--hinged").find("[data-wardrobes-screen=" + (parseInt(wardrobeStep) - 1) + "]").addClass("active");
        }, 500);
        updateStepButton($("#Wardrobes--hinged.wardrobesPopup .popupAction").first(), nextStepText);
    });

    $("#Wardrobes--sliding.wardrobesPopup .back .button").click(function (e) {
        e.preventDefault();
        var nextStepText = "Continue";

        var wardrobeStep = $("#Wardrobes--sliding").attr("data-wardrobes-step");

        if (wardrobeStep == 0) {
            $.fancybox.close();
            return false;
        }
        else if (wardrobeStep == 1) {
            nextStepText = "Continue";
        }
        else {
            nextStepText = "Next";
        }
        $("#Wardrobes--sliding").attr("data-wardrobes-step", (parseInt(wardrobeStep) - 1));
        setTimeout(function () {
            $("#Wardrobes--sliding").find("[data-wardrobes-screen]").removeClass("active");
            $("#Wardrobes--sliding").find("[data-wardrobes-screen=" + (parseInt(wardrobeStep) - 1) + "]").addClass("active");
        }, 500);
        updateStepButton($("#Wardrobes--sliding.wardrobesPopup .popupAction").first(), nextStepText);
    });


    /*
     *
     * Pin funcitons
     *
    */
    setTimeout(function () {
        $(".infoPin").addClass("loaded");
    }, 1250);

    $(document).on({
        mouseenter: function () {
            $(".infoPin").removeClass("hover");
            $(".infoPin[data-config-section-id='" + $(this).parent().data("config-section-id") + "']").addClass("hover");
            $(this).parent().find(".l2Item").each(function () {
                $(".infoPin[data-config-section-id='" + $(this).data("config-section-id") + "']").addClass("hover");
            });
        },
        mouseleave: function () {
            if (!$(this).parent().is(".open")) {
                $(".infoPin").removeClass("hover");
            }
        }
    }, ".l1ItemTrigger");

    $(document).on("click", ".infoPin", function (e) {

        e.stopPropagation();
        $(".infoPin").removeClass("active");
        console.log('click');
        $(this).addClass("active");

        HideInfoModal();

        //load menu option group
        resetCustomiseNav();
        var configSection = $(".l1Item[data-config-section-id='" + $(this).attr("data-config-section-id") + "'], .l2Item[data-config-section-id='" + $(this).attr("data-config-section-id") + "']").first();

        $(".customiseNavTrigger").trigger("click");

        if (configSection.hasClass("l1Item")) {
            configSection.find(".l1ItemTrigger").trigger("click");
        }
        else { //is level two or deeper
            //configSection.parents(".l1Item").find(".l1ItemTrigger").trigger("click");

            $("body").toggleClass("customiseNavLevel1Open");
            configSection.parents(".l1Item").find(".l1ItemTrigger").parent().toggleClass("open");

            configSection.parents(".l2Item").addClass("open");
            configSection.addClass("open");
        }

    });


    /*
     *
     * Option info modal funcitons
     *
    */
    //option 'read more' click
    //$(document).on("click", ".customiseNav .option .readMore", function (e) {

    //    e.stopPropagation();

    //    //clearTimeout(loadingTimeOutForEffect); //clear timeout / cancel loading data on click of another option

    //    if ($(".optionInfoModal").hasClass("open")) {
    //        $(".optionInfoModal").removeClass("open");
    //    }

    //    var configSectionID = $(this).parents(".l1Item[data-config-section-id], .l2Item[data-config-section-id]").first().attr("data-config-section-id");

    //    console.log(configSectionID);

    //    //get info and update modal content then...
    //    //timeout to simulate loading data
    //    //var loadingTimeOutForEffect = window.setTimeout(function () {
    //    if (typeof(configSectionID) != "undefined") {
    //        PositionInfoModal(false, configSectionID);
    //    }
    //    else {
    //        PositionInfoModal(false);
    //    }
    //    $(".optionInfoModal").addClass("open");
    //    //}
    //    //, 1000);



    //});

    $(document).on("click", ".optionInfoModal .close", function () {
        $(".optionInfoModal").removeClass("open");
        HideModalLoctator();
        setTimeout(function () {
            $(".optionInfoModal").removeAttr("style");
        }, 600);
    });

    //info modal click
    $(document).on("click", ".optionInfoModal", function (e) {

        e.stopPropagation();

    });

});

function resetCustomiseNav() {
    $("body").removeClass("customiseNavOpen customiseNavLevel1Open");
    $(".l1Item, .l2Item").removeClass("open");
}

function HideInfoModal() {
    $(".optionInfoModal").removeClass("open");
    PositionInfoModal(true);
}

function PositionInfoModal(hideModal, configSectionID = 'undefined') {

    if (typeof hideModal == 'undefined') { hideModal = false; }

    var spaceFromPin = 110; //px
    var windowWidth = $(window).width();
    var leftCenter = windowWidth / 2;
    var windowHeight = $(window).height();
    var topCenter = windowHeight / 2;
    var modalWidth = $(".optionInfoModal").width();
    var modalHeight = $(".optionInfoModal").height();
    var top = (((windowHeight - $(".customiseNav").height()) * 0.5) - (modalHeight * 0.5)) + $(".configTopNav").height();
    var left = (windowWidth * 0.5) - (modalWidth * 0.5);
    var modalPositionVertical = "center";
    var modalPositionHorizontal = "center";

    if (!hideModal) {
        if (configSectionID !== 'undefined') {
            var pin = $(".infoPin[data-config-section-id='" + configSectionID + "']");

            if (!pin.hasClass("active")) {
                pin.addClass("active");
            }

            if (pin.length > 0) {

                if (pin.offset().left + pin.width() + modalWidth + spaceFromPin > windowWidth) {
                    left = pin.offset().left - (modalWidth + spaceFromPin);
                    modalPositionHorizontal = "left";
                }
                else {
                    left = pin.offset().left + spaceFromPin;
                    modalPositionHorizontal = "right";
                }

                if ((pin.offset().top - modalHeight - spaceFromPin - $(".configTopNav").outerHeight()) > 0) {
                    top = pin.offset().top - (modalHeight + spaceFromPin);
                    modalPositionVertical = "top";
                }
                else if ((pin.offset().top + spaceFromPin + modalHeight) < (windowHeight - $(".customiseNav").height())) {
                    top = pin.offset().top + spaceFromPin;
                    modalPositionVertical = "bottom";
                }

            }

            //PositionModalLoctator(pin, top, left, modalPositionVertical, modalPositionHorizontal);
        }
    }
    else {
        top = -999999;
        left = -999999;
        HideModalLoctator();
    }

    $(".optionInfoModal").css({
        "top": top + "px",
        "left": left + "px"
    });
}

function HideModalLoctator() {
    $(".infoPin").removeClass("modalOpen");
    $(".modalLocator.vertical, .modalLocator.horizontal").animate({
        "opacity": 0
    }, 350);
    setTimeout(function () {
        $(".modalLocator.vertical, .modalLocator.horizontal").removeClass("modal-left modal-right").css({
            "bottom": "auto",
            "top": 0,
            "right": "auto",
            "left": 0,
            "height": 2,
            "width": 2,
            "opacity": 1
        });
    }, 500);
}

function PositionModalLoctator(activePin, modalTop, modalLeft, modalPositionVertical, modalPositionHorizontal) {

    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    activePin = activePin.find(".inner").first();

    var pinOffsetTop = activePin.offset().top + (activePin.outerHeight() / 2);
    var pinOffsetLeft = activePin.offset().left + (activePin.width() / 2);

    var modal = $(".optionInfoModal").first();
    var modalOffsetTop = modalTop + (modal.height() / 2);
    if (modalPositionVertical == "center") {
        modalOffsetTop = pinOffsetTop;
    }
    var modalOffsetLeft = modalPositionHorizontal == "left" ? modalLeft : modalLeft + (modal.width() / 2);

    var locatorVertical = $(".modalLocator.vertical").first();
    var locatorHorizontal = $(".modalLocator.horizontal").first();

    if (modalPositionVertical == "top") {
        locatorVertical.first().css({
            "top": "auto",
            "bottom": windowHeight - pinOffsetTop,
            "left": pinOffsetLeft - (locatorVertical.width() / 2),
            "background-position-y": "bottom",
        }).animate({
            "height": pinOffsetTop - modalOffsetTop
        }, 250);
    }
    else if (modalPositionVertical == "bottom") {
        locatorVertical.first().css({
            "bottom": "auto",
            "top": pinOffsetTop,
            "left": pinOffsetLeft - (locatorVertical.width() / 2),
            "background-position-y": "top",
        }).animate({
            "height": modalOffsetTop - pinOffsetTop
        }, 250);
    }

    setTimeout(function () {
        if (modalPositionHorizontal == "left") {
            locatorHorizontal.first().css({
                "top": modalOffsetTop - locatorHorizontal.height(),
                "left": "auto",
                "right": windowWidth - pinOffsetLeft,
                "background-position-x": "right",
            }).animate({
                "width": pinOffsetLeft - (modalOffsetLeft + modal.width())
            }, 250, function () {
                locatorHorizontal.addClass("modal-left");
            });
        }
        else {
            locatorHorizontal.first().css({
                "top": modalOffsetTop,
                "right": "auto",
                "left": pinOffsetLeft,
                "background-position-x": "left",
            }).animate({
                "width": (modalOffsetLeft - (modal.width() / 2)) - pinOffsetLeft
            }, 250, function () {
                locatorHorizontal.addClass("modal-right");
            });
        }
    }, 250);
}