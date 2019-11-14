$(document).ready(function () {
    $(".roomDetails").click(function (e) {
        e.preventDefault();

        if ($(this).is(".open")) {
            $(".roomOptionsView .roomDetails").removeClass("open").next(".roomOptions").slideUp();
        }
        else {
            $(".roomOptionsView .roomDetails").removeClass("open").next(".roomOptions").slideUp();
            $(this).addClass("open").next(".roomOptions").slideDown();
        }
    });


    $(".roomOption .remove").click(function (e) {
        e.preventDefault();
        $(this).closest(".roomOption").addClass("confirmRemove");
    });

    $(".roomOption .removeConfirm").click(function (e) {
        e.stopPropagation();

        var removedElem = $(this).closest(".roomOption");

        removedElem.addClass("removed");

        setTimeout(function () {
            removedElem.css({ "overflow": "hidden" });
        }, 500);

        //if ($(this).closest(".roomOptions").children(".roomOption.removed").length === $(this).closest(".roomOptions").children(".roomOption").length) {
        //    $(this).closest(".roomOptions").siblings(".roomDetails").toggleClass("open").next(".roomOptions").slideToggle();
        //}
    });

    $(".viewOptions .view").click(function (e) {
        e.preventDefault();

        $(".viewOptions .view").removeClass("active");
        $(this).addClass("active");

        var viewID = $(this).attr("data-view-id");

        $(".summaryPage .right .rightInner .image img").addClass("hidden");
        $(".summaryPage .right .rightInner .image img[data-view-id='" + viewID + "']").removeClass("hidden");
    });
});