$(document).ready(function () {
    
    $(".roomSelect .back").click(function (e) {
        e.preventDefault();
        $(".floorSelect > .floorPlan svg .stPin").removeClass("active inactive");
        $(".floorSelect > .floorPlan svg .stHover").removeClass("active");
        $(".roomInfos > .roomInfo").removeClass("active");
        $(".roomInfos > .roomInfo.welcome").addClass("active");
        $(".roomSelect .extras").addClass("hidden");
        $(".roomSelect .back").addClass("hidden");
        $(this).closest(".infoBox .floors").find("a.nextButton").addClass("inactive");
    });

    $(".floorNav > ul > li > a").click(function () {
        var $floorName = $(this).parent().data("floor");

        $("a.nextButton").addClass("inactive");
        $(".roomSelect .extras").addClass("hidden");
        $(".roomSelect .back").addClass("hidden");

        $(".floorSelect > .floorPlan svg .stPin").removeClass("visible inactive");
        setTimeout(function () {
            $(".stPin", $(".floorSelect .floorPlan[data-floor=" + $floorName + "]")).addClass("visible");
        }, 1000);

        
        $(".roomSelect > .floors").removeClass("hidden");

        $(".floorSelect .floorPlan").removeClass("active");
        $(".floorSelect .floorPlan[data-floor=" + $floorName + "]").addClass("active");

        if ($(".summaryPage").length > 0) {
            $(".roomInfos > .roomInfo").removeClass("active");
            $(".roomInfos > .roomInfo[data-floor=" + $floorName + "]").addClass("active");

            $(".summaryPage .roomOptionsView .roomDetails").removeClass("open").next(".roomOptions").slideUp();
        }
        else {
            $(".roomInfos > .roomInfo").removeClass("active");
            $(".roomInfos > .roomInfo.welcome").addClass("active");
        }

        $(".floorSelect > .floorPlan svg .stPin").removeClass("active");
        $(".floorSelect > .floorPlan svg .stHover").removeClass("active");

        if ($(".floorMenu").length > 0) {
            $(".floorMenu .button").removeClass("hidden");
            $(".floorMenu .configureBtn").addClass("hidden");
        }
           
    });

    //Room select
    setTimeout(function () {
        $(".floorSelect > .floorPlan svg .stPin").addClass("visible");
    }, 1000);

    $(".floorSelect > .floorPlan svg .stHover").hover(function () {
        $(".floorSelect > .floorPlan svg .stPin[data-pin-floor-id='" + $(this).attr("id") + "']").removeClass("visible");
    }, function () {
        $(".floorSelect > .floorPlan svg .stPin").addClass("visible");
    });

    $(".floorSelect > .floorPlan svg .stHover").click(function () {
        if ($(this).is(".active")) {
            $(".floorSelect > .floorPlan svg .stPin").removeClass("inactive");
            $(".floorSelect > .floorPlan svg .stHover").removeClass("active");
            $(".roomInfos > .roomInfo").removeClass("active");
            $(".roomInfos > .roomInfo.welcome").addClass("active");
            $(".roomSelect .back").addClass("hidden");
            $("a.nextButton").addClass("inactive");

            if ($(".floorMenu").length > 0) {
                $(".floorMenu .button").removeClass("hidden");
                $(".floorMenu .configureBtn").addClass("hidden");
            }
        }
        else {
            $(".roomSelect .back").removeClass("hidden");
            $(".floorSelect > .floorPlan svg .stPin").removeClass("inactive");
            $(".floorSelect > .floorPlan svg .stHover").removeClass("active");

            $(".floorSelect > .floorPlan svg .stPin[data-pin-floor-id='" + $(this).attr("id") + "']").addClass("inactive");
            $(this).addClass("active");

            $(".roomInfos > .roomInfo").removeClass("active");

            //if ($(".summaryPage").length > 0) {
            //    $(".roomInfos > .roomInfo[data-floor=" + $(this).closest(".floorPlan").data("floor") + "]").addClass("active");

            //    if ($(".roomInfos > .roomInfo[data-room=" + $(this).prop("id") + "]").find(".roomDetails").is(".open")) {
            //        $(".roomInfos > .roomInfo[data-room=" + $(this).prop("id") + "]").find(".roomDetails").removeClass("open").next(".roomOptions").slideUp();
            //    }
            //    else {
            //        $(".summaryPage .roomOptionsView .roomDetails").removeClass("open").next(".roomOptions").slideUp();
            //        $(".roomInfos > .roomInfo[data-room=" + $(this).prop("id") + "]").find(".roomDetails").addClass("open").next(".roomOptions").slideDown();
            //    }

            //}
            //else {
                //$(".roomInfos > .roomInfo").removeClass("active");

            var roomScroll;
            var $roomName = $(this).prop("id").toLowerCase();

            if ($roomName.indexOf("garden") !== -1) {
                $(".roomSelect > .extras.garden").removeClass("hidden");
                //$(".roomSelect > .floors, .roomSelect > .stairs, .roomSelect > .landing").addClass("hidden");

                roomScroll = $(".roomSelect > .extras.garden .extrasList")[0];
                if (Scrollbar.has(roomScroll)) {
                    Scrollbar.destroy(roomScroll);
                    Scrollbar.init(roomScroll, { alwaysShowTracks: true });
                }
            }
            else if ($roomName.indexOf("stairs") !== -1) {
                $(".roomSelect > .extras.stairs").removeClass("hidden");
                //$(".roomSelect > .floors, .roomSelect > .garden, .roomSelect > .landing").addClass("hidden");
                roomScroll = $(".roomSelect > .extras.stairs .extrasList")[0];
                if (Scrollbar.has(roomScroll)) {
                    Scrollbar.destroy(roomScroll);
                    Scrollbar.init(roomScroll, { alwaysShowTracks: true });
                }
            }
            else if ($roomName.indexOf("landing") !== -1) {
                $(".roomSelect > .extras.landing").removeClass("hidden");
                //$(".roomSelect > .floors, .roomSelect > .stairs, .roomSelect > .garden").addClass("hidden");
                roomScroll = $(".roomSelect > .extras.landing .extrasList")[0];
                if (Scrollbar.has(roomScroll)) {
                    Scrollbar.destroy(roomScroll);
                    Scrollbar.init(roomScroll, { alwaysShowTracks: true });
                }
            }
            else {
                //$(".roomSelect > .stairs, .roomSelect > .landing, .roomSelect > .garden").addClass("hidden");
                $(".roomInfos > .roomInfo[data-room=" + $(this).prop("id") + "]").addClass("active");
            }

            $("a.nextButton").removeClass("inactive");
            //}

            //if ($(".floorMenu").length > 0) {
            //    $(".floorMenu .button").addClass("hidden");
            //    $(".floorMenu .configureBtn").removeClass("hidden");
            //}

            
        }

        $(".floorNav > ul > li[data-floor=" + $(this).closest(".floorPlan").data("floor") + "]").addClass("active");
    });

    //$(".extras .button").click(function (e) {
    //    e.preventDefault();
    //    $(".floorSelect > .floorPlan svg .stPin").removeClass("active inactive");
    //    $(".floorSelect > .floorPlan svg .stHover").removeClass("active");
    //    $(".roomInfos > .roomInfo").removeClass("active");
    //    $(".roomInfos > .roomInfo.welcome").addClass("active");
    //    $(".roomSelect .extras").addClass("hidden");
    //    $(".roomSelect .back").addClass("hidden");
    //    $(this).closest(".infoBox .floors").find("a.nextButton").addClass("inactive");
    //});
});
