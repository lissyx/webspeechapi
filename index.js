



    var final_transcript = '';
    var recognizing = false;

    var language = 'en-GB';  // change this to your language
    var recognition;
    var speechrecognitionlist ;
    var gumstream; 
    var down = [];
    $(document).keydown(function(e) {
        down[e.keyCode] = true;
    }).keyup(function(e) {
    

        if (down[17] && down[65] ) {

            if ($('#gramdiv').is(':hidden'))
            {
                $("#gramdiv").show();
                
            }
            else
            {
                $("#gramdiv").hide();   
            }
        }
        down[e.keyCode] = false;
    }); 

    $(document).ready(function() {
        
     
        // check that your browser supports the API
        if (!('SpeechRecognition' in window)) {
            alert("Your Browser does not support the Speech API");
        } 
        else 
        {
            // 1 - 
            $("#create_button").click(function(e) {
                
                    e.preventDefault();                
                    
                    recognition = new SpeechRecognition();
                    recognition.lang = "en-US";
                    
                    $('#instructions').html('SpeechRecognition ready');

                    recognition.onstart = function() {
                        recognizing = true;
                        $('#instructions').html('Speak slowly and clearly');
                    };

                    recognition.onerror = function(event) {
                        console.log("There was a recognition error...");
                    };

                    recognition.onend = function() {
                        recognizing = false;
                        $('#instructions').html('Done');
                    };

                    recognition.onresult = function(event) {

                        console.log("recognition.onresult called");

                        //var interim_transcript = '';
                        var score = '';

                        // Assemble the transcript from the array of results
                        for (var i = event.resultIndex; i < event.results.length; ++i) {
                            if (event.results[i].isFinal) {
                                console.log("recognition.onresult : isFinal");                                
                                final_transcript += event.results[i][0].transcript;
                            } else {
                                console.log("recognition.onresult : not isFinal");                                                                
                                final_transcript += event.results[i][0].transcript;
                                score = event.results[i][0].confidence;
                            }
                        }

                        console.log("interim:  " + interim_transcript);
                        console.log("final:    " + final_transcript);
                        // update the web page
                        
                        $('#final_transcript').html(final_transcript );
                        $('#interim_transcript').html(final_transcript  )  ;            

                        $('#start_button').html('Click to speak');
            
                    };
            });
            
            // 2- 
            $("#create_grammar").click(function(e) {
                e.preventDefault();                
                speechrecognitionlist = new SpeechGrammarList();
                $('#instructions').html('SpeechGrammarList created');                                
            });

            // 3 - 
            $("#set_grammar").click(function(e) {
                e.preventDefault();
                speechrecognitionlist.addFromString  ( $('#gram').val() , 1 );
                $('#instructions').html('Grammar set');
            });
            
            //4 - 
            $("#associate_grammar").click(function(e) {
                e.preventDefault();
                recognition.grammars = speechrecognitionlist;                
            });
            
            //5- 
             $("#start_button").click(function(e) {
                e.preventDefault();
                final_transcript = '';
                //alert("clicked");
                // Request access to the User's microphone and Start recognizing voice input
                recognition.start();
                $('#instructions').html('Allow the browser to use your Microphone');
                $('#start_button').html('waiting');
                $('#transcript').html('&nbsp;');
                recognizing = true;
            });
            
            $("#stop_button").click(function(e) {
                e.preventDefault();

                recognition.stop();
                $('#start_button').html('Click to Start Again');
                recognizing = false;

            });
            
            $("#mic").click(function(e) {
                e.preventDefault();
                final_transcript = '';
                //alert("clicked");
                // Request access to the User's microphone and Start recognizing voice input
                recognition.start();
                $('#instructions').html('Allow the browser to use your Microphone');
                $('#start_button').html('waiting');
                $('#transcript').html('&nbsp;');
                recognizing = true;
            });


            


        }
    });




