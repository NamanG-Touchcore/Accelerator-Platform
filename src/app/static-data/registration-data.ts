export const registrationConfiguration = {
    "taskType": "custom",
    "task": "form",
    "identifier": "Registration",
    "id": "Registration",
    "steps": [
        {
            "step": "instruction",
            "identifier": "registrationIntro",
            "title": "Participant Enrollment",
            "continueButtonTitle": "Get Started",
            "text": "Press Get Started to begin the enrollment process."
        },
        {
            "step": "instruction",
            "identifier": "orgIdQuestionIntro",
            "title": "Medical Center ID",
            "continueButtonTitle": "Next",
            "text": "Medical Center ID is the FOP Registry number assigned to your FOP Physician and his/her medical center. If your physician did not provide you this ID number, please select 'I don't have a Medical Center ID' on the next page."
        },
        {
            "step": "question",
            "identifier": "orgIdQuestion",
            "title": "Do you have a Medical Center ID?",
            "isOptional": false,
            "answerFormat": {
                "type": "textChoice",
                "style": 0,
                "textChoices": [
                    {
                        "text": "I don't have a Medical Center ID",
                        "value": "orgIdfalse",
                        "exclusive": true
                    },
                    {
                        "text": "My doctor provided me the ID number for the Medical Center",
                        "value": "orgIdtrue",
                        "exclusive": true
                    }
                ]
            },
            "navigationRule": "predicate",
            "predicateResults": {
                "orgIdtrue": "OrganizationId"
            },
            "text": ""
        },
        {
            "step": "question",
            "identifier": "OrganizationId",
            "title": "Do you have a Medical Center ID?",
            "isOptional": false,
            "placeholder": "Required",
            "waitAlert": {
                "type": "OrganizationID",
                "loadingTitle": "",
                "loadingMessage": "Verifying your Medical Center ID",
                "title": "Invalid Medical Center ID",
                "message": "This Medical Center ID is not valid.  Please enter a valid ID.",
                "isOK": false,
                "apiEndpoint": "study/organization/{value}"
            },
            "answerFormat": {
                "type": "textAnswer",
                "multipleLines": false,
                "keyboardType": "asciiCapable",
                "maximumLength": 10,
                "validationRegex": "^([a-zA-Z0-9]*)$",
                "invalidMessage": "Special characters are not allowed."
            },
            "text": "Please enter the Medical Center ID"
        },
        {
            "step": "form",
            "identifier": "basicInformation",
            "text": "Basic Information",
            "isOptional": false,
            "formItems": [
                {
                    "identifier": "FirstName",
                    "text": "First Name",
                    "isOptional": false,
                    "placeholder": "Required",
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "maximumLength": 50,
                        "autocapitalizationType": "words",
                        "autocorrectionType": "no",
                        "spellCheckingType": "no",
                        "keyboardType": "asciiCapable"
                    }
                },
                {
                    "identifier": "MiddleName",
                    "text": "Middle Name",
                    "isOptional": true,
                    "placeholder": "",
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "maximumLength": 50,
                        "autocapitalizationType": "words",
                        "autocorrectionType": "no",
                        "spellCheckingType": "no",
                        "keyboardType": "asciiCapable"
                    }
                },
                {
                    "identifier": "LastName",
                    "text": "Last Name",
                    "isOptional": false,
                    "placeholder": "Required",
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "maximumLength": 50,
                        "autocapitalizationType": "words",
                        "autocorrectionType": "no",
                        "spellCheckingType": "no",
                        "keyboardType": "asciiCapable"
                    }
                },
                {
                    "identifier": "Initials",
                    "text": "Initials",
                    "isOptional": false,
                    "placeholder": "Required",
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "autocapitalizationType": "allCharacters",
                        "autocorrectionType": "no",
                        "spellCheckingType": "no",
                        "keyboardType": "asciiCapable",
                        "maximumLength": 3
                    }
                },
                {
                    "text": "Date of Birth",
                    "identifier": "DateOfBirth",
                    "isOptional": false,
                    "answerFormat": {
                        "defaultDate": "",
                        "style": "date",
                        "minimumDate": "1919-01-01",
                        "type": "date",
                        "maximumDate": "today"
                    },
                    "placeholder": "Required"
                },
                {
                    "identifier": "PreferredLanguage",
                    "text": "Preferred Language",
                    "placeholder": "Required",
                    "isOptional": false,
                    "answerFormat": {
                        "type": "languagePicker",
                        "textChoices": [
                            {
                                "text": "English",
                                "value": "en",
                                "exclusive": true
                            },
                            {
                                "text": "Español",
                                "value": "es",
                                "exclusive": true
                            },
                            {
                                "text": "Deutsch",
                                "value": "de",
                                "exclusive": true
                            },
                            {
                                "text": "Français",
                                "value": "fr",
                                "exclusive": true
                            },
                            {
                                "text": "Italiano",
                                "value": "it",
                                "exclusive": true
                            },
                            {
                                "text": "Português",
                                "value": "pt",
                                "exclusive": true
                            },
                            {
                                "text": "Русский",
                                "value": "ru",
                                "exclusive": true
                            }
                        ]
                    }
                },
                {
                    "identifier": "Email",
                    "text": "Email",
                    "isOptional": false,
                    "placeholder": "Required",
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "maximumLength": 250,
                        "invalidMessage": "Please enter a valid email address",
                        "keyboardType": "emailAddress",
                        "autocapitalizationType": "none",
                        "autocorrectionType": "no",
                        "spellCheckingType": "no",
                        "validationRegex": "^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                    },
                    "waitAlert": {
                        "type": "Email",
                        "loadingTitle": "",
                        "loadingMessage": "Checking email availability",
                        "title": "The email address you provided is already in use.",
                        "message": "Please provide a different email address",
                        "isOK": false,
                        "apiEndpoint": "userRegistration/email?emailAddress={value}"
                    }
                },
                {
                    "identifier": "HomePhoneValue",
                    "text": "Home Phone",
                    "isOptional": true,
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "maximumLength": 27,
                        "invalidMessage": "Please enter a valid phone number",
                        "keyboardType": "asciiCapableNumberPad",
                        "validationRegex": "^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{1,6})?[-. )(]*(\\d{1,4})?[-.) ]*(\\d{1,4})?[-. /]*(\\d{1,4})(?: *(?:\\s*(?:#|x\\.?|X)?[-. /]*(\\d{1,6})))?\\s*$"
                    }
                }
            ],
            "title": "About You"
        },
        {
            "step": "form",
            "identifier": "contactInformation1",
            "text": "Contact Information 1 of 4",
            "isOptional": true,
            "formItems": [
                {
                    "identifier": "CountryCode",
                    "text": "Country Code",
                    "isOptional": false,
                    "answerFormat": {
                        "type": "countryPicker",
                        "textChoices": [
                            {
                                "exclusive": true,
                                "value": "9bd15f06-68a8-4cbc-9b1e-fbe4598633a8",
                                "countryCode": "AFG",
                                "text": "Afghanistan (+93)"
                            },
                            {
                                "exclusive": true,
                                "value": "2d59363e-1492-4aba-8752-c7fd3a1e7854",
                                "countryCode": "ALA",
                                "text": "Aland Islands (+358)"
                            },
                            {
                                "exclusive": true,
                                "value": "8e802ecf-a705-4cb6-ae09-892852042740",
                                "countryCode": "ALB",
                                "text": "Albania (+355)"
                            },
                            {
                                "exclusive": true,
                                "value": "06ac8c14-6f51-4c7f-8a27-90528085bed9",
                                "countryCode": "DZA",
                                "text": "Algeria (+213)"
                            },
                            {
                                "exclusive": true,
                                "value": "21929cc4-e3de-4f46-8a81-80a8ebf12015",
                                "countryCode": "ASM",
                                "text": "American Samoa (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "39f18743-2466-4f6a-9788-c3bad33cf3f1",
                                "countryCode": "AND",
                                "text": "Andorra (+376)"
                            },
                            {
                                "exclusive": true,
                                "value": "dfde2611-a2d3-4202-bdd4-6fe6627dbb56",
                                "countryCode": "AGO",
                                "text": "Angola (+244)"
                            },
                            {
                                "exclusive": true,
                                "value": "5d0833dc-336d-4256-853a-68ace8b4eb29",
                                "countryCode": "AIA",
                                "text": "Anguilla (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "a0645712-7498-406c-9c5b-db039678c204",
                                "countryCode": "ATA",
                                "text": "Antarctica (+672)"
                            },
                            {
                                "exclusive": true,
                                "value": "d17f70cd-3d5c-443a-a45b-0652af1348f1",
                                "countryCode": "ATG",
                                "text": "Antigua and Barbuda (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "365eb66a-b0e9-4528-8ca1-d313955778e1",
                                "countryCode": "ARG",
                                "text": "Argentina (+54)"
                            },
                            {
                                "exclusive": true,
                                "value": "0b98282b-7e63-49ec-9c78-372cac75b8d9",
                                "countryCode": "ARM",
                                "text": "Armenia (+374)"
                            },
                            {
                                "exclusive": true,
                                "value": "26e3e97e-3699-449d-a941-96ba303af952",
                                "countryCode": "ABW",
                                "text": "Aruba (+297)"
                            },
                            {
                                "exclusive": true,
                                "value": "154371c0-9152-4a07-abc5-1b1533604535",
                                "countryCode": "AUS",
                                "text": "Australia (+61)"
                            },
                            {
                                "exclusive": true,
                                "value": "6bb14a2a-7cf9-47f0-b4a4-cee675b29237",
                                "countryCode": "AUT",
                                "text": "Austria (+43)"
                            },
                            {
                                "exclusive": true,
                                "value": "b0438a5d-d68c-461c-8d96-1753a4007c0a",
                                "countryCode": "AZE",
                                "text": "Azerbaijan (+994)"
                            },
                            {
                                "exclusive": true,
                                "value": "292a4155-b237-440a-bc42-aff33a4bba7f",
                                "countryCode": "BHS",
                                "text": "Bahamas (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "f12d0f4d-9077-48f4-90c5-4aeb77b86a39",
                                "countryCode": "BHR",
                                "text": "Bahrain (+973)"
                            },
                            {
                                "exclusive": true,
                                "value": "57431685-4cb1-4cde-bd5b-fd92da587abc",
                                "countryCode": "BGD",
                                "text": "Bangladesh (+880)"
                            },
                            {
                                "exclusive": true,
                                "value": "ecd3631d-6d6d-4f29-b87e-0058026e1be7",
                                "countryCode": "BRB",
                                "text": "Barbados (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "bc966375-7170-4f75-a3e6-85629f604b6d",
                                "countryCode": "BLR",
                                "text": "Belarus (+375)"
                            },
                            {
                                "exclusive": true,
                                "value": "5198bbcb-d778-449a-8a2b-7ffb2bc71415",
                                "countryCode": "BEL",
                                "text": "Belgium (+32)"
                            },
                            {
                                "exclusive": true,
                                "value": "030405bf-0737-4c97-9f2e-c830cc52e3f5",
                                "countryCode": "BLZ",
                                "text": "Belize (+501)"
                            },
                            {
                                "exclusive": true,
                                "value": "c8102d12-69d3-4d17-a3bf-5eb7663c83d3",
                                "countryCode": "BEN",
                                "text": "Benin (+229)"
                            },
                            {
                                "exclusive": true,
                                "value": "6aec429e-d46c-4cc0-a47f-43d5f1310985",
                                "countryCode": "BMU",
                                "text": "Bermuda (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "79ed8430-58f7-4034-aa05-8836cb095541",
                                "countryCode": "BTN",
                                "text": "Bhutan (+975)"
                            },
                            {
                                "exclusive": true,
                                "value": "76ec7a7c-77aa-416f-813a-bfd15c5ecafe",
                                "countryCode": "BOL",
                                "text": "Bolivia (+591)"
                            },
                            {
                                "exclusive": true,
                                "value": "13f9152d-c195-41a9-aae8-0383235f32ba",
                                "countryCode": "BIH",
                                "text": "Bosnia and Herzegovina (+387)"
                            },
                            {
                                "exclusive": true,
                                "value": "d3df7eac-e72a-4ff4-a515-8936cd9a339c",
                                "countryCode": "BWA",
                                "text": "Botswana (+267)"
                            },
                            {
                                "exclusive": true,
                                "value": "965e87f1-4a97-4602-8903-0ca909280d74",
                                "countryCode": "BVT",
                                "text": "Bouvet Island (+55)"
                            },
                            {
                                "exclusive": true,
                                "value": "97c450b0-6927-41af-8592-763369627dcd",
                                "countryCode": "BRA",
                                "text": "Brazil (+55)"
                            },
                            {
                                "exclusive": true,
                                "value": "eeafedfd-5da5-4f52-b237-92ee5a26d1be",
                                "countryCode": "IOT",
                                "text": "British Indian Ocean Territory (+246)"
                            },
                            {
                                "exclusive": true,
                                "value": "319746fc-3051-4902-9b84-31b99fd3f61e",
                                "countryCode": "BRN",
                                "text": "Brunei (+673)"
                            },
                            {
                                "exclusive": true,
                                "value": "54ef538a-5c95-4922-a3ff-09175dced560",
                                "countryCode": "BGR",
                                "text": "Bulgaria (+359)"
                            },
                            {
                                "exclusive": true,
                                "value": "8f4158a0-9561-47a1-b044-9f705f35ba21",
                                "countryCode": "BFA",
                                "text": "Burkina Faso (+226)"
                            },
                            {
                                "exclusive": true,
                                "value": "edd10024-c13d-4ca6-8b68-6343d27053c1",
                                "countryCode": "BDI",
                                "text": "Burundi (+257)"
                            },
                            {
                                "exclusive": true,
                                "value": "dc47d82c-71b2-497b-8b23-be3ce316e0de",
                                "countryCode": "KHM",
                                "text": "Cambodia (+855)"
                            },
                            {
                                "exclusive": true,
                                "value": "c687a9e3-5bee-4d9a-93bc-aa77f570f3f0",
                                "countryCode": "CMR",
                                "text": "Cameroon (+237)"
                            },
                            {
                                "exclusive": true,
                                "value": "ae5b263b-15d6-436a-ba10-8c8c9a8064d5",
                                "countryCode": "CAN",
                                "text": "Canada (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "29f18550-9cc9-4b5a-a30f-bb642f044527",
                                "countryCode": "CPV",
                                "text": "Cape Verde (+238)"
                            },
                            {
                                "exclusive": true,
                                "value": "6cec7a83-5bc6-4739-abeb-c75b3bce8139",
                                "countryCode": "BES",
                                "text": "Caribbean Netherlands (+599)"
                            },
                            {
                                "exclusive": true,
                                "value": "4a931197-0f57-40e7-913e-461b2d0efcc6",
                                "countryCode": "CYM",
                                "text": "Cayman Islands (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "37715d26-c447-4c1e-b2c9-7afa789d29c2",
                                "countryCode": "CAF",
                                "text": "Central African Republic (+236)"
                            },
                            {
                                "exclusive": true,
                                "value": "2612bb98-6f20-481e-aee7-391ccb6da0b7",
                                "countryCode": "TCD",
                                "text": "Chad (+235)"
                            },
                            {
                                "exclusive": true,
                                "value": "c3f444cf-98b2-4a3a-9fdc-87cf12c73bde",
                                "countryCode": "CHL",
                                "text": "Chile (+56)"
                            },
                            {
                                "exclusive": true,
                                "value": "070d12b3-2e3b-4fcc-9323-bb9f2ffbf064",
                                "countryCode": "CHN",
                                "text": "China (+86)"
                            },
                            {
                                "exclusive": true,
                                "value": "70fb75c1-a62c-4210-a4e3-58cd963e4f9f",
                                "countryCode": "CXR",
                                "text": "Christmas Island (+61)"
                            },
                            {
                                "exclusive": true,
                                "value": "020d99fa-2beb-49ac-8285-d6d5178a70f4",
                                "countryCode": "CCK",
                                "text": "Cocos (Keeling) Islands (+61)"
                            },
                            {
                                "exclusive": true,
                                "value": "d1e98f73-c690-40c1-b64d-b24d6ff18112",
                                "countryCode": "COL",
                                "text": "Colombia (+57)"
                            },
                            {
                                "exclusive": true,
                                "value": "92a4b81e-0e27-408b-a8c4-2d64b15cbd92",
                                "countryCode": "COM",
                                "text": "Comoros (+269)"
                            },
                            {
                                "exclusive": true,
                                "value": "70df5059-a88f-47c7-b854-69c7c952a2c3",
                                "countryCode": "COG",
                                "text": "Congo (+242)"
                            },
                            {
                                "exclusive": true,
                                "value": "0ec966e0-7b4a-49e9-be42-8a0a94de3f2e",
                                "countryCode": "COD",
                                "text": "Congo, Democratic Republic (+243)"
                            },
                            {
                                "exclusive": true,
                                "value": "ecfcd7e0-75b6-45e9-9671-383f2adf457f",
                                "countryCode": "COK",
                                "text": "Cook Islands (+682)"
                            },
                            {
                                "exclusive": true,
                                "value": "7e09d1ea-72b5-4ef6-a1ea-7b7b7873cad8",
                                "countryCode": "CRI",
                                "text": "Costa Rica (+506)"
                            },
                            {
                                "exclusive": true,
                                "value": "ee31eaeb-64e2-4252-91a5-0ef80f299e1d",
                                "countryCode": "CIV",
                                "text": "Côte d’Ivoire (+225)"
                            },
                            {
                                "exclusive": true,
                                "value": "68b517ba-b665-4f07-9351-c2bd68851a5c",
                                "countryCode": "HRV",
                                "text": "Croatia (+385)"
                            },
                            {
                                "exclusive": true,
                                "value": "57559a3f-068e-4354-8ebe-5d7a9a8e7035",
                                "countryCode": "CUB",
                                "text": "Cuba (+53)"
                            },
                            {
                                "exclusive": true,
                                "value": "62ab7e8b-eff2-433b-8fb6-aaf45da7b6ae",
                                "countryCode": "CUW",
                                "text": "Curacao (+599)"
                            },
                            {
                                "exclusive": true,
                                "value": "25cfbca7-8253-4ff3-9613-72c2c71ebeb7",
                                "countryCode": "CYP",
                                "text": "Cyprus (+357)"
                            },
                            {
                                "exclusive": true,
                                "value": "0e129c26-b6c1-4909-8675-6b43c132f1a8",
                                "countryCode": "CZE",
                                "text": "Czech Republic (+420)"
                            },
                            {
                                "exclusive": true,
                                "value": "502d91df-dbfe-4cfa-9658-afe4fcddd94d",
                                "countryCode": "DNK",
                                "text": "Denmark (+45)"
                            },
                            {
                                "exclusive": true,
                                "value": "dd4f770c-e669-4366-af8c-73af9f44a095",
                                "countryCode": "DJI",
                                "text": "Djibouti (+253)"
                            },
                            {
                                "exclusive": true,
                                "value": "ecba6b30-1c40-4027-a477-d916460b82bf",
                                "countryCode": "DMA",
                                "text": "Dominica (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "6789543d-98da-4bf1-9c34-6f925ee1e938",
                                "countryCode": "DOM",
                                "text": "Dominican Republic (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "e0883311-0da9-443c-860d-9ddcad73c1d1",
                                "countryCode": "TMP",
                                "text": "East Timor (+670)"
                            },
                            {
                                "exclusive": true,
                                "value": "2eca5044-6759-4c69-b7fb-02d1dc0da118",
                                "countryCode": "ECU",
                                "text": "Ecuador (+593)"
                            },
                            {
                                "exclusive": true,
                                "value": "6591a1f2-ef3f-470b-bc94-1feb85f1e125",
                                "countryCode": "EGY",
                                "text": "Egypt (+20)"
                            },
                            {
                                "exclusive": true,
                                "value": "efb9b052-4f71-47a7-98c4-e23561d0ff7b",
                                "countryCode": "SLV",
                                "text": "El Salvador (+503)"
                            },
                            {
                                "exclusive": true,
                                "value": "1164fdef-7c7d-4aa5-b176-b21e5d64185c",
                                "countryCode": "GNQ",
                                "text": "Equatorial Guinea (+240)"
                            },
                            {
                                "exclusive": true,
                                "value": "d38b3b99-963c-4b6a-9a51-edc1411a78e3",
                                "countryCode": "ERI",
                                "text": "Eritrea (+291)"
                            },
                            {
                                "exclusive": true,
                                "value": "7f704b92-f67b-4969-844f-ee028e97dd7b",
                                "countryCode": "EST",
                                "text": "Estonia (+372)"
                            },
                            {
                                "exclusive": true,
                                "value": "cdfb49a3-b74a-4e23-aff5-10a7196b42b2",
                                "countryCode": "ETH",
                                "text": "Ethiopia (+251)"
                            },
                            {
                                "exclusive": true,
                                "value": "a05c2356-62d7-4d1f-938a-610f0f51df27",
                                "countryCode": "FLK",
                                "text": "Falkland Islands (+500)"
                            },
                            {
                                "exclusive": true,
                                "value": "32f8db5b-faef-4c70-9645-cd67a9789b77",
                                "countryCode": "FRO",
                                "text": "Faroe Islands (+298)"
                            },
                            {
                                "exclusive": true,
                                "value": "5451207b-4e66-45ce-a5fd-6896f9611fd0",
                                "countryCode": "FJI",
                                "text": "Fiji Islands (+679)"
                            },
                            {
                                "exclusive": true,
                                "value": "31ec32b3-1b75-4132-ba1c-532de439807c",
                                "countryCode": "FIN",
                                "text": "Finland (+358)"
                            },
                            {
                                "exclusive": true,
                                "value": "6f461b7a-22ee-4061-8c0e-237e8231c7ba",
                                "countryCode": "FRA",
                                "text": "France (+33)"
                            },
                            {
                                "exclusive": true,
                                "value": "290ef2d1-321f-4954-8016-2a1f35272aad",
                                "countryCode": "GUF",
                                "text": "French Guiana (+594)"
                            },
                            {
                                "exclusive": true,
                                "value": "da2f90fd-bb7d-4100-87c8-6b5c77615993",
                                "countryCode": "PYF",
                                "text": "French Polynesia (+689)"
                            },
                            {
                                "exclusive": true,
                                "value": "c554eb94-4717-4201-90b5-ebc96f91e516",
                                "countryCode": "ATF",
                                "text": "French Southern territories (+262)"
                            },
                            {
                                "exclusive": true,
                                "value": "0af8e5fd-555d-4eb0-bddd-74705b48b667",
                                "countryCode": "GAB",
                                "text": "Gabon (+241)"
                            },
                            {
                                "exclusive": true,
                                "value": "8999b0e8-4f20-4595-b1d8-65be943cb1c2",
                                "countryCode": "GMB",
                                "text": "Gambia (+220)"
                            },
                            {
                                "exclusive": true,
                                "value": "2eb17ee5-66b7-4308-8154-2e268379228d",
                                "countryCode": "GEO",
                                "text": "Georgia (+995)"
                            },
                            {
                                "exclusive": true,
                                "value": "7be08b75-35d8-4e41-9637-d2ccf3d02032",
                                "countryCode": "DEU",
                                "text": "Germany (+49)"
                            },
                            {
                                "exclusive": true,
                                "value": "ae9ab425-74b7-4006-9c93-999ed98f632b",
                                "countryCode": "GHA",
                                "text": "Ghana (+233)"
                            },
                            {
                                "exclusive": true,
                                "value": "49a45914-ad95-48f0-9e38-4f8d2a272df3",
                                "countryCode": "GIB",
                                "text": "Gibraltar (+350)"
                            },
                            {
                                "exclusive": true,
                                "value": "677e838f-807c-43df-83b5-120e872d12f8",
                                "countryCode": "GRC",
                                "text": "Greece (+30)"
                            },
                            {
                                "exclusive": true,
                                "value": "a1ae33a1-3085-4867-847e-75cfc8b8a768",
                                "countryCode": "GRL",
                                "text": "Greenland (+299)"
                            },
                            {
                                "exclusive": true,
                                "value": "2c890dd9-d86c-4523-aa8d-88f8d20054bc",
                                "countryCode": "GRD",
                                "text": "Grenada (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "8937ff08-b7e1-4981-a3c8-02c1eb903be8",
                                "countryCode": "GLP",
                                "text": "Guadeloupe (+590)"
                            },
                            {
                                "exclusive": true,
                                "value": "b67a5634-2da0-4a89-9f99-1148a6147787",
                                "countryCode": "GUM",
                                "text": "Guam (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "9ff2ec7e-6e57-4a84-82fe-f6357eac0528",
                                "countryCode": "GTM",
                                "text": "Guatemala (+502)"
                            },
                            {
                                "exclusive": true,
                                "value": "95e599c9-de91-461a-9eb3-6d355ff7cc20",
                                "countryCode": "GGY",
                                "text": "Guernsey (+44)"
                            },
                            {
                                "exclusive": true,
                                "value": "a1446770-62dc-4ac7-ad6e-1ef14311e150",
                                "countryCode": "GIN",
                                "text": "Guinea (+224)"
                            },
                            {
                                "exclusive": true,
                                "value": "b729563d-6c2d-4c80-a196-a172b5660b1e",
                                "countryCode": "GNB",
                                "text": "Guinea-Bissau (+245)"
                            },
                            {
                                "exclusive": true,
                                "value": "68d92ac5-f0fc-4a00-8111-6dc1ca37a19c",
                                "countryCode": "GUY",
                                "text": "Guyana (+592)"
                            },
                            {
                                "exclusive": true,
                                "value": "96689b35-4b87-4bb5-8eeb-61aa1e02c76e",
                                "countryCode": "HTI",
                                "text": "Haiti (+509)"
                            },
                            {
                                "exclusive": true,
                                "value": "8392682c-43f2-4bd5-945a-6028ad351c7a",
                                "countryCode": "HMD",
                                "text": "Heard Island and McDonald Islands (+0)"
                            },
                            {
                                "exclusive": true,
                                "value": "4da072fa-ca34-4dc9-9824-1294db31d539",
                                "countryCode": "HND",
                                "text": "Honduras (+504)"
                            },
                            {
                                "exclusive": true,
                                "value": "ad83aadc-c747-40af-a3b1-77162b6955e5",
                                "countryCode": "HKG",
                                "text": "Hong Kong (+852)"
                            },
                            {
                                "exclusive": true,
                                "value": "849ab826-50d5-4e61-b9c6-97756e1d1ec1",
                                "countryCode": "HUN",
                                "text": "Hungary (+36)"
                            },
                            {
                                "exclusive": true,
                                "value": "6c3ffa4a-b6e0-40b5-9efe-c18e622f47fe",
                                "countryCode": "ISL",
                                "text": "Iceland (+354)"
                            },
                            {
                                "exclusive": true,
                                "value": "153c8749-cf7b-46c5-9e04-22709505b0e7",
                                "countryCode": "IND",
                                "text": "India (+91)"
                            },
                            {
                                "exclusive": true,
                                "value": "6334bac9-0119-4dde-b6df-ecc751eca44a",
                                "countryCode": "IDN",
                                "text": "Indonesia (+62)"
                            },
                            {
                                "exclusive": true,
                                "value": "4875abf5-7604-4e48-bebd-91ffaf1c5193",
                                "countryCode": "IRN",
                                "text": "Iran (+98)"
                            },
                            {
                                "exclusive": true,
                                "value": "422bbce9-27cd-4568-8385-b346e1d6c5b0",
                                "countryCode": "IRQ",
                                "text": "Iraq (+964)"
                            },
                            {
                                "exclusive": true,
                                "value": "4151e8bb-4b1b-4e38-ab84-673dc1df54df",
                                "countryCode": "IRL",
                                "text": "Ireland (+353)"
                            },
                            {
                                "exclusive": true,
                                "value": "efc3012b-738e-406f-845a-193e2e9d7dfd",
                                "countryCode": "IMN",
                                "text": "Isle of Man (+44)"
                            },
                            {
                                "exclusive": true,
                                "value": "40a53607-8453-4215-9c88-09fdfc16edc0",
                                "countryCode": "ISR",
                                "text": "Israel (+972)"
                            },
                            {
                                "exclusive": true,
                                "value": "a2d88d27-c12c-4c38-bd3b-b02192e1af55",
                                "countryCode": "ITA",
                                "text": "Italy (+39)"
                            },
                            {
                                "exclusive": true,
                                "value": "02fa3564-f487-4cc4-b8a4-a6ce8d4fa9c2",
                                "countryCode": "JAM",
                                "text": "Jamaica (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "7137178a-cb8d-4e99-92bf-b65204b2a8bb",
                                "countryCode": "JPN",
                                "text": "Japan (+81)"
                            },
                            {
                                "exclusive": true,
                                "value": "68438ea6-bfb6-4a63-abe2-573073a20b21",
                                "countryCode": "JEY",
                                "text": "Jersey (+44)"
                            },
                            {
                                "exclusive": true,
                                "value": "bd3cd34e-a949-4bb0-ae2c-cd611d925d90",
                                "countryCode": "JOR",
                                "text": "Jordan (+962)"
                            },
                            {
                                "exclusive": true,
                                "value": "3b0f3334-d4c5-4ee9-bc37-b8020928929b",
                                "countryCode": "KAZ",
                                "text": "Kazakstan (+7)"
                            },
                            {
                                "exclusive": true,
                                "value": "946f6ee7-c7c2-4bf4-a634-eac913195f08",
                                "countryCode": "KEN",
                                "text": "Kenya (+254)"
                            },
                            {
                                "exclusive": true,
                                "value": "780377d3-d0c0-4dc3-88fe-f43316e16e50",
                                "countryCode": "KIR",
                                "text": "Kiribati (+686)"
                            },
                            {
                                "exclusive": true,
                                "value": "02f49510-8ec4-41ac-995c-58656e948529",
                                "countryCode": "XKX",
                                "text": "Kosovo (+383)"
                            },
                            {
                                "exclusive": true,
                                "value": "6e3c2533-0ce1-4054-b2da-59df534b3376",
                                "countryCode": "KWT",
                                "text": "Kuwait (+965)"
                            },
                            {
                                "exclusive": true,
                                "value": "1cec0389-d839-4395-bfe8-29ca78690267",
                                "countryCode": "KGZ",
                                "text": "Kyrgyzstan (+996)"
                            },
                            {
                                "exclusive": true,
                                "value": "aaf08099-cfcf-4957-b6d7-a882954618d3",
                                "countryCode": "LAO",
                                "text": "Laos (+856)"
                            },
                            {
                                "exclusive": true,
                                "value": "c4efdec5-b368-42ce-a8e2-c77c6df2ac2e",
                                "countryCode": "LVA",
                                "text": "Latvia (+371)"
                            },
                            {
                                "exclusive": true,
                                "value": "7dde0c31-e55c-4a33-9115-5331d61c89a5",
                                "countryCode": "LBN",
                                "text": "Lebanon (+961)"
                            },
                            {
                                "exclusive": true,
                                "value": "960212cb-66ff-48a4-815c-da2ade4c28a9",
                                "countryCode": "LSO",
                                "text": "Lesotho (+266)"
                            },
                            {
                                "exclusive": true,
                                "value": "70217877-c0f7-4b65-b16f-3f8b731014f2",
                                "countryCode": "LBR",
                                "text": "Liberia (+231)"
                            },
                            {
                                "exclusive": true,
                                "value": "10971f39-f3ba-4987-ab32-990cceda6462",
                                "countryCode": "LBY",
                                "text": "Libya (+218)"
                            },
                            {
                                "exclusive": true,
                                "value": "69a3f31f-7c72-480e-b0ba-46dee50be963",
                                "countryCode": "LIE",
                                "text": "Liechtenstein (+423)"
                            },
                            {
                                "exclusive": true,
                                "value": "d3504007-9e38-4d1b-b6f2-6381af16864c",
                                "countryCode": "LTU",
                                "text": "Lithuania (+370)"
                            },
                            {
                                "exclusive": true,
                                "value": "d614abb5-e8f2-4085-b543-bda4c13ac260",
                                "countryCode": "LUX",
                                "text": "Luxembourg (+352)"
                            },
                            {
                                "exclusive": true,
                                "value": "2657787c-dd24-4063-94c7-9926df652a33",
                                "countryCode": "MAC",
                                "text": "Macao (+853)"
                            },
                            {
                                "exclusive": true,
                                "value": "b86313c5-475f-408d-977e-b9af9b9ad9fd",
                                "countryCode": "MKD",
                                "text": "Macedonia (+389)"
                            },
                            {
                                "exclusive": true,
                                "value": "fba5352d-3218-49a3-882c-bef2629e7e12",
                                "countryCode": "MDG",
                                "text": "Madagascar (+261)"
                            },
                            {
                                "exclusive": true,
                                "value": "91e6af0e-2e6b-4f40-853b-1c391f649be0",
                                "countryCode": "MWI",
                                "text": "Malawi (+265)"
                            },
                            {
                                "exclusive": true,
                                "value": "8e6bfb02-7912-47fd-88ec-9995f722c02b",
                                "countryCode": "MYS",
                                "text": "Malaysia (+60)"
                            },
                            {
                                "exclusive": true,
                                "value": "1f6a73fb-5980-4c5c-93b9-2d07497a1fff",
                                "countryCode": "MDV",
                                "text": "Maldives (+960)"
                            },
                            {
                                "exclusive": true,
                                "value": "a0ea6eed-0f24-4151-94a0-850c880818de",
                                "countryCode": "MLI",
                                "text": "Mali (+223)"
                            },
                            {
                                "exclusive": true,
                                "value": "20716aef-7ef0-4886-a099-da2b15e3551a",
                                "countryCode": "MLT",
                                "text": "Malta (+356)"
                            },
                            {
                                "exclusive": true,
                                "value": "77d32e9f-81ae-4bf5-96ad-140340ddcd8e",
                                "countryCode": "MHL",
                                "text": "Marshall Islands (+692)"
                            },
                            {
                                "exclusive": true,
                                "value": "cf0917ce-a3cf-4909-804c-11e89aa268c2",
                                "countryCode": "MTQ",
                                "text": "Martinique (+596)"
                            },
                            {
                                "exclusive": true,
                                "value": "0eafbfbd-a569-4f93-bbc9-3f58b3a917cd",
                                "countryCode": "MRT",
                                "text": "Mauritania (+222)"
                            },
                            {
                                "exclusive": true,
                                "value": "ba69dc50-d8d0-4dab-9ce2-b8e6abd67550",
                                "countryCode": "MUS",
                                "text": "Mauritius (+230)"
                            },
                            {
                                "exclusive": true,
                                "value": "4c9de336-8fa5-43dd-9647-4090dedea7f6",
                                "countryCode": "MYT",
                                "text": "Mayotte (+262)"
                            },
                            {
                                "exclusive": true,
                                "value": "b357436c-a43d-4827-ad9f-59424c973349",
                                "countryCode": "MEX",
                                "text": "Mexico (+52)"
                            },
                            {
                                "exclusive": true,
                                "value": "c41974fb-8121-4c03-a36f-da9e997c999e",
                                "countryCode": "FSM",
                                "text": "Micronesia, Federated States (+691)"
                            },
                            {
                                "exclusive": true,
                                "value": "2b5c77db-5ec6-4f24-94dd-51b84dab7723",
                                "countryCode": "MDA",
                                "text": "Moldova (+373)"
                            },
                            {
                                "exclusive": true,
                                "value": "b4e22bf6-7df0-4a0e-93a4-965be351ff6e",
                                "countryCode": "MCO",
                                "text": "Monaco (+377)"
                            },
                            {
                                "exclusive": true,
                                "value": "07124930-730d-444b-9e04-1e628d970123",
                                "countryCode": "MNG",
                                "text": "Mongolia (+976)"
                            },
                            {
                                "exclusive": true,
                                "value": "943c5dd5-fcfb-4c0c-aaa2-f90127b35616",
                                "countryCode": "MNE",
                                "text": "Montenegro (+382)"
                            },
                            {
                                "exclusive": true,
                                "value": "4ee98fe5-1f6a-422f-a1bd-c9bc3c0edbe5",
                                "countryCode": "MSR",
                                "text": "Montserrat (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "64f3103e-2004-48ec-b8ca-4daa9c7ee8d5",
                                "countryCode": "MAR",
                                "text": "Morocco (+212)"
                            },
                            {
                                "exclusive": true,
                                "value": "1fe5720d-3230-461f-b4bb-6834db33a864",
                                "countryCode": "MOZ",
                                "text": "Mozambique (+258)"
                            },
                            {
                                "exclusive": true,
                                "value": "a041edff-b083-418c-9ea9-614a5c4f10c7",
                                "countryCode": "MMR",
                                "text": "Myanmar (+95)"
                            },
                            {
                                "exclusive": true,
                                "value": "11233c3c-94a9-4eda-89cc-897fcff6d97d",
                                "countryCode": "NAM",
                                "text": "Namibia (+264)"
                            },
                            {
                                "exclusive": true,
                                "value": "760ae222-30ae-40a6-91e0-db515243ee30",
                                "countryCode": "NRU",
                                "text": "Nauru (+674)"
                            },
                            {
                                "exclusive": true,
                                "value": "f4a4ead7-f896-401d-a04b-70fc56c9620c",
                                "countryCode": "NPL",
                                "text": "Nepal (+977)"
                            },
                            {
                                "exclusive": true,
                                "value": "b1cc5546-49f8-4c08-97b9-ee9ca27de0d0",
                                "countryCode": "NLD",
                                "text": "Netherlands (+31)"
                            },
                            {
                                "exclusive": true,
                                "value": "07660705-c197-4bba-80eb-0b1b1b124005",
                                "countryCode": "ANT",
                                "text": "Netherlands Antilles (+599)"
                            },
                            {
                                "exclusive": true,
                                "value": "19590e92-2662-4cfa-8b47-10a04012ac65",
                                "countryCode": "NCL",
                                "text": "New Caledonia (+687)"
                            },
                            {
                                "exclusive": true,
                                "value": "a833297d-7228-4f0d-b647-a33e4b5f40e7",
                                "countryCode": "NZL",
                                "text": "New Zealand (+64)"
                            },
                            {
                                "exclusive": true,
                                "value": "12a23bbe-6691-41d1-b186-527e2e1b1047",
                                "countryCode": "NIC",
                                "text": "Nicaragua (+505)"
                            },
                            {
                                "exclusive": true,
                                "value": "cd78e2f3-0d47-46da-8d0e-85706a559cc3",
                                "countryCode": "NER",
                                "text": "Niger (+227)"
                            },
                            {
                                "exclusive": true,
                                "value": "fe1485df-0ba3-472f-8172-19051b97473c",
                                "countryCode": "NGA",
                                "text": "Nigeria (+234)"
                            },
                            {
                                "exclusive": true,
                                "value": "b99ed306-a7f6-4d99-84e1-b696987f088f",
                                "countryCode": "NIU",
                                "text": "Niue (+683)"
                            },
                            {
                                "exclusive": true,
                                "value": "f75ed26c-d07f-49b8-8958-15a528cb0341",
                                "countryCode": "NFK",
                                "text": "Norfolk Island  (+672)"
                            },
                            {
                                "exclusive": true,
                                "value": "b0e66c95-d214-48ce-80a1-bf21a5deb121",
                                "countryCode": "PRK",
                                "text": "North Korea (+850)"
                            },
                            {
                                "exclusive": true,
                                "value": "bc18483f-b246-486d-a1ef-ba3166d17592",
                                "countryCode": "MNP",
                                "text": "Northern Mariana Islands (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "f7ba2826-533c-4a6a-85fa-514ffeee3d6a",
                                "countryCode": "NOR",
                                "text": "Norway (+47)"
                            },
                            {
                                "exclusive": true,
                                "value": "40c952d0-bbcb-4f87-8a8b-efa0116d9f12",
                                "countryCode": "OMN",
                                "text": "Oman (+968)"
                            },
                            {
                                "exclusive": true,
                                "value": "09e68698-036e-4f5a-b899-230a17c0c000",
                                "countryCode": "PAK",
                                "text": "Pakistan (+92)"
                            },
                            {
                                "exclusive": true,
                                "value": "97eee012-4c72-442d-961c-864bce753235",
                                "countryCode": "PLW",
                                "text": "Palau (+680)"
                            },
                            {
                                "exclusive": true,
                                "value": "11101b07-7d4b-4835-9d13-fa7290d9bb07",
                                "countryCode": "PSE",
                                "text": "Palestine (+970)"
                            },
                            {
                                "exclusive": true,
                                "value": "5dace59a-a767-4f08-8d9e-d7c43a5b544b",
                                "countryCode": "PAN",
                                "text": "Panama (+507)"
                            },
                            {
                                "exclusive": true,
                                "value": "bada06db-b3aa-4868-aea6-103464be4241",
                                "countryCode": "PNG",
                                "text": "Papua New Guinea (+675)"
                            },
                            {
                                "exclusive": true,
                                "value": "6f9b02fe-1c61-41fe-9dd9-6aea55b52cdc",
                                "countryCode": "PRY",
                                "text": "Paraguay (+595)"
                            },
                            {
                                "exclusive": true,
                                "value": "3980e6e0-e530-4fe3-b4b3-03b741a1abea",
                                "countryCode": "PER",
                                "text": "Peru (+51)"
                            },
                            {
                                "exclusive": true,
                                "value": "7b7ab804-e9b5-4494-94d1-66135cb42845",
                                "countryCode": "PHL",
                                "text": "Philippines (+63)"
                            },
                            {
                                "exclusive": true,
                                "value": "517607ad-19fb-4f1b-8850-400987187b4f",
                                "countryCode": "PCN",
                                "text": "Pitcairn (+64)"
                            },
                            {
                                "exclusive": true,
                                "value": "c5c7bbe2-6ff6-47be-9078-bd4100f690a7",
                                "countryCode": "POL",
                                "text": "Poland (+48)"
                            },
                            {
                                "exclusive": true,
                                "value": "e3c7001b-1784-454f-a4bd-679ea5ea49b7",
                                "countryCode": "PRT",
                                "text": "Portugal (+351)"
                            },
                            {
                                "exclusive": true,
                                "value": "dab76df3-1c7b-4a40-b075-641cb13ca17c",
                                "countryCode": "PRI",
                                "text": "Puerto Rico (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "5d7362e1-b744-4db1-8ed3-59b3b645de4b",
                                "countryCode": "QAT",
                                "text": "Qatar (+974)"
                            },
                            {
                                "exclusive": true,
                                "value": "b24cde87-4f65-4b4b-beae-304ad45ab9a5",
                                "countryCode": "REU",
                                "text": "Réunion  (+262)"
                            },
                            {
                                "exclusive": true,
                                "value": "69ac49a7-bc0f-4258-880e-e231dba9089a",
                                "countryCode": "ROM",
                                "text": "Romania (+40)"
                            },
                            {
                                "exclusive": true,
                                "value": "9d86653c-51c0-46c6-93ee-ed9178671c48",
                                "countryCode": "RUS",
                                "text": "Russia (+7)"
                            },
                            {
                                "exclusive": true,
                                "value": "6f9d8e2c-fa72-4396-9d9d-31a93b12c1a0",
                                "countryCode": "RWA",
                                "text": "Rwanda (+250)"
                            },
                            {
                                "exclusive": true,
                                "value": "9d4b2a05-145c-479f-acfa-e04c6d12c3d1",
                                "countryCode": "BLM",
                                "text": "Saint Barthelemy (+590)"
                            },
                            {
                                "exclusive": true,
                                "value": "87e1bedd-a570-476e-a4fb-ef4d07dafbcf",
                                "countryCode": "SHN",
                                "text": "Saint Helena (+290)"
                            },
                            {
                                "exclusive": true,
                                "value": "29d4665b-08c8-40ed-88d2-2bc62a152d45",
                                "countryCode": "KNA",
                                "text": "Saint Kitts and Nevis (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "8a04ec58-5e7b-4c97-b798-7bbcc27b8715",
                                "countryCode": "LCA",
                                "text": "Saint Lucia (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "894c60fc-61f7-4f47-a76f-54b34e4f71e2",
                                "countryCode": "MAF",
                                "text": "Saint Martin (+590)"
                            },
                            {
                                "exclusive": true,
                                "value": "1f0fcfe8-4b3d-477c-b8f6-49f70283e047",
                                "countryCode": "SPM",
                                "text": "Saint Pierre and Miquelon (+508)"
                            },
                            {
                                "exclusive": true,
                                "value": "4145e443-299a-4d9f-81a7-d2208ccd445c",
                                "countryCode": "VCT",
                                "text": "Saint Vincent and the Grenadines (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "6b4e95ca-30ca-4f85-baca-758804445ba3",
                                "countryCode": "WSM",
                                "text": "Samoa (+685)"
                            },
                            {
                                "exclusive": true,
                                "value": "91546c55-3143-407c-ac01-8ee9befadcdd",
                                "countryCode": "SMR",
                                "text": "San Marino (+378)"
                            },
                            {
                                "exclusive": true,
                                "value": "5133ddc6-6a7c-470a-8951-0cffd5c0e42f",
                                "countryCode": "STP",
                                "text": "Sao Tome and Principe (+239)"
                            },
                            {
                                "exclusive": true,
                                "value": "bbde31dc-c91a-4ee6-bc87-3bc4240f4abe",
                                "countryCode": "SAU",
                                "text": "Saudi Arabia (+966)"
                            },
                            {
                                "exclusive": true,
                                "value": "7d4967a7-693d-434e-a493-9586bdf0ac07",
                                "countryCode": "SEN",
                                "text": "Senegal (+221)"
                            },
                            {
                                "exclusive": true,
                                "value": "0bbe1382-bdbc-452b-a8d6-d3413dbafa54",
                                "countryCode": "SRB",
                                "text": "Serbia (+381)"
                            },
                            {
                                "exclusive": true,
                                "value": "a0b47e7b-80db-473a-b572-dad22f226c9b",
                                "countryCode": "SYC",
                                "text": "Seychelles (+248)"
                            },
                            {
                                "exclusive": true,
                                "value": "c5c242b9-7889-4a33-b40e-7f81758f86ab",
                                "countryCode": "SLE",
                                "text": "Sierra Leone (+232)"
                            },
                            {
                                "exclusive": true,
                                "value": "602a1ef7-4cd0-4c9c-9d63-cc17b2a2c949",
                                "countryCode": "SGP",
                                "text": "Singapore (+65)"
                            },
                            {
                                "exclusive": true,
                                "value": "c71c7098-a25e-4c81-9206-10f4de27d0c3",
                                "countryCode": "SXM",
                                "text": "Sint Maarten (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "29c789fd-814e-49d9-a651-bded358658b2",
                                "countryCode": "SVK",
                                "text": "Slovakia (+421)"
                            },
                            {
                                "exclusive": true,
                                "value": "bed42b7d-7829-4a8c-92b5-957d8caef76a",
                                "countryCode": "SVN",
                                "text": "Slovenia (+386)"
                            },
                            {
                                "exclusive": true,
                                "value": "17eda87a-9efb-461e-985c-458d04144952",
                                "countryCode": "SLB",
                                "text": "Solomon Islands (+677)"
                            },
                            {
                                "exclusive": true,
                                "value": "f762ffd7-4c75-4d3e-a6fe-849cf7f91883",
                                "countryCode": "SOM",
                                "text": "Somalia (+252)"
                            },
                            {
                                "exclusive": true,
                                "value": "29a7f1d9-c618-437b-ada6-22de36b8774a",
                                "countryCode": "ZAF",
                                "text": "South Africa (+27)"
                            },
                            {
                                "exclusive": true,
                                "value": "884919dc-9fd2-4067-a570-7b498434798b",
                                "countryCode": "SGS",
                                "text": "South Georgia and the South Sandwich Islands  (+500)"
                            },
                            {
                                "exclusive": true,
                                "value": "d2ea5c63-b25c-422c-ace6-0dc546e73b85",
                                "countryCode": "KOR",
                                "text": "South Korea (+82)"
                            },
                            {
                                "exclusive": true,
                                "value": "31112082-f607-4714-8787-e9632923981e",
                                "countryCode": "SSD",
                                "text": "South Sudan (+211)"
                            },
                            {
                                "exclusive": true,
                                "value": "3e2e4f7e-656b-452d-8c5d-f5871f9ce37d",
                                "countryCode": "ESP",
                                "text": "Spain (+34)"
                            },
                            {
                                "exclusive": true,
                                "value": "9941d86a-c41c-4738-84c5-030d44e1e012",
                                "countryCode": "LKA",
                                "text": "Sri Lanka (+94)"
                            },
                            {
                                "exclusive": true,
                                "value": "52611432-72e7-486f-b00c-c61275caf979",
                                "countryCode": "SDN",
                                "text": "Sudan (+249)"
                            },
                            {
                                "exclusive": true,
                                "value": "c2aba180-edec-4a52-923a-1d01c0b273b2",
                                "countryCode": "SUR",
                                "text": "Suriname (+597)"
                            },
                            {
                                "exclusive": true,
                                "value": "7ae7b693-3f24-4eb8-9ba1-f9f2d949487b",
                                "countryCode": "SJM",
                                "text": "Svalbard and Jan Mayen (+47)"
                            },
                            {
                                "exclusive": true,
                                "value": "69c8019f-0ace-4ce5-8bda-f167380b1329",
                                "countryCode": "SWZ",
                                "text": "Swaziland (+268)"
                            },
                            {
                                "exclusive": true,
                                "value": "439931b1-d30f-4e09-bfae-13f9f08cf43b",
                                "countryCode": "SWE",
                                "text": "Sweden (+46)"
                            },
                            {
                                "exclusive": true,
                                "value": "38e11a2f-a277-48e7-ae8f-e9dfd24597a4",
                                "countryCode": "CHE",
                                "text": "Switzerland (+41)"
                            },
                            {
                                "exclusive": true,
                                "value": "f1b21931-3682-4244-b327-524774a2ebd7",
                                "countryCode": "SYR",
                                "text": "Syria (+963)"
                            },
                            {
                                "exclusive": true,
                                "value": "13a9ca93-35f1-4242-a3e7-99cbc2e3b4ba",
                                "countryCode": "TWN",
                                "text": "Taiwan (+886)"
                            },
                            {
                                "exclusive": true,
                                "value": "f1078bf0-7d9e-4e12-84f7-e80a9dc1b1e6",
                                "countryCode": "TJK",
                                "text": "Tajikistan (+992)"
                            },
                            {
                                "exclusive": true,
                                "value": "4ea8b8df-cd44-4519-ab7c-52ae8ee81d16",
                                "countryCode": "TZA",
                                "text": "Tanzania (+255)"
                            },
                            {
                                "exclusive": true,
                                "value": "a4a17c1c-c476-49a6-ba38-03761c56030b",
                                "countryCode": "THA",
                                "text": "Thailand (+66)"
                            },
                            {
                                "exclusive": true,
                                "value": "015cba1e-e742-4e3d-aac6-067faa0a99c5",
                                "countryCode": "TGO",
                                "text": "Togo (+228)"
                            },
                            {
                                "exclusive": true,
                                "value": "2039dc60-28a0-4b6a-b4f3-57470c7fec1c",
                                "countryCode": "TKL",
                                "text": "Tokelau (+690)"
                            },
                            {
                                "exclusive": true,
                                "value": "a0aa7b41-3779-471a-800f-59e311ef59b3",
                                "countryCode": "TON",
                                "text": "Tonga (+676)"
                            },
                            {
                                "exclusive": true,
                                "value": "b29af078-6337-457b-a7ee-5e5b766063a4",
                                "countryCode": "TTO",
                                "text": "Trinidad and Tobago (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "fe712830-2cf1-4336-b09e-69e6ab6be15a",
                                "countryCode": "TUN",
                                "text": "Tunisia (+216)"
                            },
                            {
                                "exclusive": true,
                                "value": "e1c4ce62-1629-4b68-803f-d3c9b8b56a9a",
                                "countryCode": "TUR",
                                "text": "Turkey (+90)"
                            },
                            {
                                "exclusive": true,
                                "value": "93419871-5cb4-4291-9f3d-58f01e4d6b89",
                                "countryCode": "TKM",
                                "text": "Turkmenistan (+993)"
                            },
                            {
                                "exclusive": true,
                                "value": "d834a426-fec9-41af-9fb2-38ab1039e679",
                                "countryCode": "TCA",
                                "text": "Turks and Caicos Islands (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "dc573c20-567f-46ff-938c-2925bd2d2823",
                                "countryCode": "TUV",
                                "text": "Tuvalu (+688)"
                            },
                            {
                                "exclusive": true,
                                "value": "e0b38856-2338-477b-b734-1707785907d0",
                                "countryCode": "UGA",
                                "text": "Uganda (+256)"
                            },
                            {
                                "exclusive": true,
                                "value": "6d33db96-67d4-46d9-a8d5-adeea9953aec",
                                "countryCode": "UKR",
                                "text": "Ukraine (+380)"
                            },
                            {
                                "exclusive": true,
                                "value": "c43970cc-3ba2-4f4c-908e-863e8ab287e5",
                                "countryCode": "ARE",
                                "text": "United Arab Emirates (+971)"
                            },
                            {
                                "exclusive": true,
                                "value": "f5829b5b-853f-40b0-897c-1d2c6571755c",
                                "countryCode": "GBR",
                                "text": "United Kingdom (+44)"
                            },
                            {
                                "exclusive": true,
                                "value": "94e7ea25-7acd-442b-88af-177114dab88a",
                                "countryCode": "USA",
                                "text": "United States (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "8821365a-e7ab-4e82-a7eb-30df888378d4",
                                "countryCode": "UMI",
                                "text": "United States Minor Outlying Islands (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "f8938e9e-cc54-46b3-9a9f-e3ea9c798d84",
                                "countryCode": "URY",
                                "text": "Uruguay (+598)"
                            },
                            {
                                "exclusive": true,
                                "value": "6af69fce-fc24-4137-b879-ec062819f24f",
                                "countryCode": "UZB",
                                "text": "Uzbekistan (+998)"
                            },
                            {
                                "exclusive": true,
                                "value": "4b4d412a-9254-46ef-afe1-14e97f0cb52e",
                                "countryCode": "VUT",
                                "text": "Vanuatu (+678)"
                            },
                            {
                                "exclusive": true,
                                "value": "c15c3484-6358-4945-892e-4525e70dca4c",
                                "countryCode": "VAT",
                                "text": "Vatican (Holy See) (+379)"
                            },
                            {
                                "exclusive": true,
                                "value": "a35a43dc-a5d2-4f63-bedc-454783b485fd",
                                "countryCode": "VEN",
                                "text": "Venezuela (+58)"
                            },
                            {
                                "exclusive": true,
                                "value": "42717cd8-396d-40b6-9b76-4c1a8b1bad37",
                                "countryCode": "VNM",
                                "text": "Vietnam (+84)"
                            },
                            {
                                "exclusive": true,
                                "value": "3cbed530-dcd7-41a0-97cd-6d093f34a6d9",
                                "countryCode": "VGB",
                                "text": "Virgin Islands, British (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "59c7b8a9-9222-4a7a-b7b4-09e6da0b2424",
                                "countryCode": "VIR",
                                "text": "Virgin Islands, U.S. (+1)"
                            },
                            {
                                "exclusive": true,
                                "value": "13ecb107-305f-41f2-87ec-3cc8582b37cb",
                                "countryCode": "WLF",
                                "text": "Wallis and Futuna (+681)"
                            },
                            {
                                "exclusive": true,
                                "value": "ce004b8b-1047-472a-a073-6389646c8eb3",
                                "countryCode": "ESH",
                                "text": "Western Sahara (+212)"
                            },
                            {
                                "exclusive": true,
                                "value": "f44de457-e3a4-493a-a065-a86024ae9fff",
                                "countryCode": "YEM",
                                "text": "Yemen (+967)"
                            },
                            {
                                "exclusive": true,
                                "value": "cbb51cf5-2780-4339-8964-7b94fdbfbd1f",
                                "countryCode": "ZMB",
                                "text": "Zambia (+260)"
                            },
                            {
                                "exclusive": true,
                                "value": "c15a5abc-10d5-47b0-9b9c-13b48d29de60",
                                "countryCode": "ZWE",
                                "text": "Zimbabwe (+263)"
                            }
                        ]
                    }
                },
                {
                    "identifier": "MobilePhoneValue",
                    "text": "Mobile Phone",
                    "isOptional": false,
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "maximumLength": 27,
                        "invalidMessage": "Please enter a valid phone number",
                        "keyboardType": "asciiCapableNumberPad",
                        "validationRegex": "^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{1,6})?[-. )(]*(\\d{1,4})?[-.) ]*(\\d{1,4})?[-. /]*(\\d{1,4})(?: *(?:\\s*(?:#|x\\.?|X)?[-. /]*(\\d{1,6})))?\\s*$"
                    },
                    "placeholder": "Enter both Country Code and Mobile Phone"
                },
                {
                    "identifier": "CanReceiveSMS",
                    "text": "Participant agrees to receive SMS or text survey reminders on their mobile phone. The participant's mobile phone plan text messaging rates may apply.",
                    "isOptional": true,
                    "answerFormat": {
                        "type": "textChoice",
                        "textChoices": [
                            {
                                "value": true,
                                "text": "Yes"
                            },
                            {
                                "value": false,
                                "text": "No"
                            }
                        ],
                        "style": "single"
                    }
                }
            ],
            "title": "About You"
        },
        {
            "step": "form",
            "identifier": "contactInformation2",
            "text": "Contact Information 2 of 4",
            "isOptional": false,
            "formItems": [
                {
                    "identifier": "AddressLine1",
                    "text": "Address Line 1",
                    "isOptional": true,
                    "placeholder": "",
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "maximumLength": 100,
                        "autocapitalizationType": "words"
                    }
                },
                {
                    "identifier": "AddressLine2",
                    "text": "Address Line 2",
                    "isOptional": true,
                    "placeholder": "",
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "maximumLength": 100,
                        "autocapitalizationType": "words"
                    }
                },
                {
                    "identifier": "CountryId",
                    "text": "Country",
                    "isOptional": true,
                    "answerFormat": {
                        "type": "countryPicker",
                        "textChoices": [
                            {
                                "exclusive": true,
                                "countryCode": "AFG",
                                "text": "Afghanistan",
                                "value": "9bd15f06-68a8-4cbc-9b1e-fbe4598633a8"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ALA",
                                "text": "Aland Islands",
                                "value": "2d59363e-1492-4aba-8752-c7fd3a1e7854"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ALB",
                                "text": "Albania",
                                "value": "8e802ecf-a705-4cb6-ae09-892852042740"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "DZA",
                                "text": "Algeria",
                                "value": "06ac8c14-6f51-4c7f-8a27-90528085bed9"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ASM",
                                "text": "American Samoa",
                                "value": "21929cc4-e3de-4f46-8a81-80a8ebf12015"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "AND",
                                "text": "Andorra",
                                "value": "39f18743-2466-4f6a-9788-c3bad33cf3f1"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "AGO",
                                "text": "Angola",
                                "value": "dfde2611-a2d3-4202-bdd4-6fe6627dbb56"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "AIA",
                                "text": "Anguilla",
                                "value": "5d0833dc-336d-4256-853a-68ace8b4eb29"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ATA",
                                "text": "Antarctica",
                                "value": "a0645712-7498-406c-9c5b-db039678c204"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ATG",
                                "text": "Antigua and Barbuda",
                                "value": "d17f70cd-3d5c-443a-a45b-0652af1348f1"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ARG",
                                "text": "Argentina",
                                "value": "365eb66a-b0e9-4528-8ca1-d313955778e1"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ARM",
                                "text": "Armenia",
                                "value": "0b98282b-7e63-49ec-9c78-372cac75b8d9"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ABW",
                                "text": "Aruba",
                                "value": "26e3e97e-3699-449d-a941-96ba303af952"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "AUS",
                                "text": "Australia",
                                "value": "154371c0-9152-4a07-abc5-1b1533604535"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "AUT",
                                "text": "Austria",
                                "value": "6bb14a2a-7cf9-47f0-b4a4-cee675b29237"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "AZE",
                                "text": "Azerbaijan",
                                "value": "b0438a5d-d68c-461c-8d96-1753a4007c0a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BHS",
                                "text": "Bahamas",
                                "value": "292a4155-b237-440a-bc42-aff33a4bba7f"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BHR",
                                "text": "Bahrain",
                                "value": "f12d0f4d-9077-48f4-90c5-4aeb77b86a39"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BGD",
                                "text": "Bangladesh",
                                "value": "57431685-4cb1-4cde-bd5b-fd92da587abc"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BRB",
                                "text": "Barbados",
                                "value": "ecd3631d-6d6d-4f29-b87e-0058026e1be7"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BLR",
                                "text": "Belarus",
                                "value": "bc966375-7170-4f75-a3e6-85629f604b6d"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BEL",
                                "text": "Belgium",
                                "value": "5198bbcb-d778-449a-8a2b-7ffb2bc71415"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BLZ",
                                "text": "Belize",
                                "value": "030405bf-0737-4c97-9f2e-c830cc52e3f5"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BEN",
                                "text": "Benin",
                                "value": "c8102d12-69d3-4d17-a3bf-5eb7663c83d3"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BMU",
                                "text": "Bermuda",
                                "value": "6aec429e-d46c-4cc0-a47f-43d5f1310985"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BTN",
                                "text": "Bhutan",
                                "value": "79ed8430-58f7-4034-aa05-8836cb095541"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BOL",
                                "text": "Bolivia",
                                "value": "76ec7a7c-77aa-416f-813a-bfd15c5ecafe"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BIH",
                                "text": "Bosnia and Herzegovina",
                                "value": "13f9152d-c195-41a9-aae8-0383235f32ba"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BWA",
                                "text": "Botswana",
                                "value": "d3df7eac-e72a-4ff4-a515-8936cd9a339c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BVT",
                                "text": "Bouvet Island",
                                "value": "965e87f1-4a97-4602-8903-0ca909280d74"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BRA",
                                "text": "Brazil",
                                "value": "97c450b0-6927-41af-8592-763369627dcd"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "IOT",
                                "text": "British Indian Ocean Territory",
                                "value": "eeafedfd-5da5-4f52-b237-92ee5a26d1be"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BRN",
                                "text": "Brunei",
                                "value": "319746fc-3051-4902-9b84-31b99fd3f61e"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BGR",
                                "text": "Bulgaria",
                                "value": "54ef538a-5c95-4922-a3ff-09175dced560"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BFA",
                                "text": "Burkina Faso",
                                "value": "8f4158a0-9561-47a1-b044-9f705f35ba21"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BDI",
                                "text": "Burundi",
                                "value": "edd10024-c13d-4ca6-8b68-6343d27053c1"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "KHM",
                                "text": "Cambodia",
                                "value": "dc47d82c-71b2-497b-8b23-be3ce316e0de"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CMR",
                                "text": "Cameroon",
                                "value": "c687a9e3-5bee-4d9a-93bc-aa77f570f3f0"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CAN",
                                "text": "Canada",
                                "value": "ae5b263b-15d6-436a-ba10-8c8c9a8064d5"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CPV",
                                "text": "Cape Verde",
                                "value": "29f18550-9cc9-4b5a-a30f-bb642f044527"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BES",
                                "text": "Caribbean Netherlands",
                                "value": "6cec7a83-5bc6-4739-abeb-c75b3bce8139"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CYM",
                                "text": "Cayman Islands",
                                "value": "4a931197-0f57-40e7-913e-461b2d0efcc6"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CAF",
                                "text": "Central African Republic",
                                "value": "37715d26-c447-4c1e-b2c9-7afa789d29c2"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TCD",
                                "text": "Chad",
                                "value": "2612bb98-6f20-481e-aee7-391ccb6da0b7"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CHL",
                                "text": "Chile",
                                "value": "c3f444cf-98b2-4a3a-9fdc-87cf12c73bde"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CHN",
                                "text": "China",
                                "value": "070d12b3-2e3b-4fcc-9323-bb9f2ffbf064"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CXR",
                                "text": "Christmas Island",
                                "value": "70fb75c1-a62c-4210-a4e3-58cd963e4f9f"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CCK",
                                "text": "Cocos (Keeling) Islands",
                                "value": "020d99fa-2beb-49ac-8285-d6d5178a70f4"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "COL",
                                "text": "Colombia",
                                "value": "d1e98f73-c690-40c1-b64d-b24d6ff18112"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "COM",
                                "text": "Comoros",
                                "value": "92a4b81e-0e27-408b-a8c4-2d64b15cbd92"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "COG",
                                "text": "Congo",
                                "value": "70df5059-a88f-47c7-b854-69c7c952a2c3"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "COD",
                                "text": "Congo, Democratic Republic",
                                "value": "0ec966e0-7b4a-49e9-be42-8a0a94de3f2e"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "COK",
                                "text": "Cook Islands",
                                "value": "ecfcd7e0-75b6-45e9-9671-383f2adf457f"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CRI",
                                "text": "Costa Rica",
                                "value": "7e09d1ea-72b5-4ef6-a1ea-7b7b7873cad8"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CIV",
                                "text": "Côte d’Ivoire",
                                "value": "ee31eaeb-64e2-4252-91a5-0ef80f299e1d"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "HRV",
                                "text": "Croatia",
                                "value": "68b517ba-b665-4f07-9351-c2bd68851a5c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CUB",
                                "text": "Cuba",
                                "value": "57559a3f-068e-4354-8ebe-5d7a9a8e7035"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CUW",
                                "text": "Curacao",
                                "value": "62ab7e8b-eff2-433b-8fb6-aaf45da7b6ae"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CBR",
                                "text": "Cyberbunker",
                                "value": "0d395e7f-f3ef-460b-a9c1-0479e60043ca"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CYP",
                                "text": "Cyprus",
                                "value": "25cfbca7-8253-4ff3-9613-72c2c71ebeb7"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CZE",
                                "text": "Czech Republic",
                                "value": "0e129c26-b6c1-4909-8675-6b43c132f1a8"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "DNK",
                                "text": "Denmark",
                                "value": "502d91df-dbfe-4cfa-9658-afe4fcddd94d"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "DJI",
                                "text": "Djibouti",
                                "value": "dd4f770c-e669-4366-af8c-73af9f44a095"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "DMA",
                                "text": "Dominica",
                                "value": "ecba6b30-1c40-4027-a477-d916460b82bf"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "DOM",
                                "text": "Dominican Republic",
                                "value": "6789543d-98da-4bf1-9c34-6f925ee1e938"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TMP",
                                "text": "East Timor",
                                "value": "e0883311-0da9-443c-860d-9ddcad73c1d1"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ECU",
                                "text": "Ecuador",
                                "value": "2eca5044-6759-4c69-b7fb-02d1dc0da118"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "EGY",
                                "text": "Egypt",
                                "value": "6591a1f2-ef3f-470b-bc94-1feb85f1e125"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SLV",
                                "text": "El Salvador",
                                "value": "efb9b052-4f71-47a7-98c4-e23561d0ff7b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GNQ",
                                "text": "Equatorial Guinea",
                                "value": "1164fdef-7c7d-4aa5-b176-b21e5d64185c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ERI",
                                "text": "Eritrea",
                                "value": "d38b3b99-963c-4b6a-9a51-edc1411a78e3"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "EST",
                                "text": "Estonia",
                                "value": "7f704b92-f67b-4969-844f-ee028e97dd7b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ETH",
                                "text": "Ethiopia",
                                "value": "cdfb49a3-b74a-4e23-aff5-10a7196b42b2"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "EUR",
                                "text": "European Union",
                                "value": "b94d44ba-df45-4e0d-a3b1-82ab65acc182"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "FLK",
                                "text": "Falkland Islands",
                                "value": "a05c2356-62d7-4d1f-938a-610f0f51df27"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "FRO",
                                "text": "Faroe Islands",
                                "value": "32f8db5b-faef-4c70-9645-cd67a9789b77"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "FJI",
                                "text": "Fiji Islands",
                                "value": "5451207b-4e66-45ce-a5fd-6896f9611fd0"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "FIN",
                                "text": "Finland",
                                "value": "31ec32b3-1b75-4132-ba1c-532de439807c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "FRA",
                                "text": "France",
                                "value": "6f461b7a-22ee-4061-8c0e-237e8231c7ba"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GUF",
                                "text": "French Guiana",
                                "value": "290ef2d1-321f-4954-8016-2a1f35272aad"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PYF",
                                "text": "French Polynesia",
                                "value": "da2f90fd-bb7d-4100-87c8-6b5c77615993"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ATF",
                                "text": "French Southern territories",
                                "value": "c554eb94-4717-4201-90b5-ebc96f91e516"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GAB",
                                "text": "Gabon",
                                "value": "0af8e5fd-555d-4eb0-bddd-74705b48b667"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GMB",
                                "text": "Gambia",
                                "value": "8999b0e8-4f20-4595-b1d8-65be943cb1c2"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GEO",
                                "text": "Georgia",
                                "value": "2eb17ee5-66b7-4308-8154-2e268379228d"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "DEU",
                                "text": "Germany",
                                "value": "7be08b75-35d8-4e41-9637-d2ccf3d02032"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GHA",
                                "text": "Ghana",
                                "value": "ae9ab425-74b7-4006-9c93-999ed98f632b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GIB",
                                "text": "Gibraltar",
                                "value": "49a45914-ad95-48f0-9e38-4f8d2a272df3"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GRC",
                                "text": "Greece",
                                "value": "677e838f-807c-43df-83b5-120e872d12f8"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GRL",
                                "text": "Greenland",
                                "value": "a1ae33a1-3085-4867-847e-75cfc8b8a768"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GRD",
                                "text": "Grenada",
                                "value": "2c890dd9-d86c-4523-aa8d-88f8d20054bc"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GLP",
                                "text": "Guadeloupe",
                                "value": "8937ff08-b7e1-4981-a3c8-02c1eb903be8"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GUM",
                                "text": "Guam",
                                "value": "b67a5634-2da0-4a89-9f99-1148a6147787"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GTM",
                                "text": "Guatemala",
                                "value": "9ff2ec7e-6e57-4a84-82fe-f6357eac0528"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GGY",
                                "text": "Guernsey",
                                "value": "95e599c9-de91-461a-9eb3-6d355ff7cc20"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GIN",
                                "text": "Guinea",
                                "value": "a1446770-62dc-4ac7-ad6e-1ef14311e150"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GNB",
                                "text": "Guinea-Bissau",
                                "value": "b729563d-6c2d-4c80-a196-a172b5660b1e"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GUY",
                                "text": "Guyana",
                                "value": "68d92ac5-f0fc-4a00-8111-6dc1ca37a19c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "HTI",
                                "text": "Haiti",
                                "value": "96689b35-4b87-4bb5-8eeb-61aa1e02c76e"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "HMD",
                                "text": "Heard Island and McDonald Islands",
                                "value": "8392682c-43f2-4bd5-945a-6028ad351c7a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "HND",
                                "text": "Honduras",
                                "value": "4da072fa-ca34-4dc9-9824-1294db31d539"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "HKG",
                                "text": "Hong Kong",
                                "value": "ad83aadc-c747-40af-a3b1-77162b6955e5"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "HUN",
                                "text": "Hungary",
                                "value": "849ab826-50d5-4e61-b9c6-97756e1d1ec1"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ISL",
                                "text": "Iceland",
                                "value": "6c3ffa4a-b6e0-40b5-9efe-c18e622f47fe"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "IND",
                                "text": "India",
                                "value": "153c8749-cf7b-46c5-9e04-22709505b0e7"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "IDN",
                                "text": "Indonesia",
                                "value": "6334bac9-0119-4dde-b6df-ecc751eca44a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "IRN",
                                "text": "Iran",
                                "value": "4875abf5-7604-4e48-bebd-91ffaf1c5193"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "IRQ",
                                "text": "Iraq",
                                "value": "422bbce9-27cd-4568-8385-b346e1d6c5b0"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "IRL",
                                "text": "Ireland",
                                "value": "4151e8bb-4b1b-4e38-ab84-673dc1df54df"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "IMN",
                                "text": "Isle of Man",
                                "value": "efc3012b-738e-406f-845a-193e2e9d7dfd"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ISR",
                                "text": "Israel",
                                "value": "40a53607-8453-4215-9c88-09fdfc16edc0"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ITA",
                                "text": "Italy",
                                "value": "a2d88d27-c12c-4c38-bd3b-b02192e1af55"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "JAM",
                                "text": "Jamaica",
                                "value": "02fa3564-f487-4cc4-b8a4-a6ce8d4fa9c2"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "JPN",
                                "text": "Japan",
                                "value": "7137178a-cb8d-4e99-92bf-b65204b2a8bb"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "JEY",
                                "text": "Jersey",
                                "value": "68438ea6-bfb6-4a63-abe2-573073a20b21"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "JOR",
                                "text": "Jordan",
                                "value": "bd3cd34e-a949-4bb0-ae2c-cd611d925d90"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "KAZ",
                                "text": "Kazakstan",
                                "value": "3b0f3334-d4c5-4ee9-bc37-b8020928929b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "KEN",
                                "text": "Kenya",
                                "value": "946f6ee7-c7c2-4bf4-a634-eac913195f08"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "KIR",
                                "text": "Kiribati",
                                "value": "780377d3-d0c0-4dc3-88fe-f43316e16e50"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "XKX",
                                "text": "Kosovo",
                                "value": "02f49510-8ec4-41ac-995c-58656e948529"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "KWT",
                                "text": "Kuwait",
                                "value": "6e3c2533-0ce1-4054-b2da-59df534b3376"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "KGZ",
                                "text": "Kyrgyzstan",
                                "value": "1cec0389-d839-4395-bfe8-29ca78690267"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LAO",
                                "text": "Laos",
                                "value": "aaf08099-cfcf-4957-b6d7-a882954618d3"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LVA",
                                "text": "Latvia",
                                "value": "c4efdec5-b368-42ce-a8e2-c77c6df2ac2e"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LBN",
                                "text": "Lebanon",
                                "value": "7dde0c31-e55c-4a33-9115-5331d61c89a5"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LSO",
                                "text": "Lesotho",
                                "value": "960212cb-66ff-48a4-815c-da2ade4c28a9"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LBR",
                                "text": "Liberia",
                                "value": "70217877-c0f7-4b65-b16f-3f8b731014f2"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LBY",
                                "text": "Libya",
                                "value": "10971f39-f3ba-4987-ab32-990cceda6462"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LIE",
                                "text": "Liechtenstein",
                                "value": "69a3f31f-7c72-480e-b0ba-46dee50be963"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LTU",
                                "text": "Lithuania",
                                "value": "d3504007-9e38-4d1b-b6f2-6381af16864c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LUX",
                                "text": "Luxembourg",
                                "value": "d614abb5-e8f2-4085-b543-bda4c13ac260"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MAC",
                                "text": "Macao",
                                "value": "2657787c-dd24-4063-94c7-9926df652a33"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MKD",
                                "text": "Macedonia",
                                "value": "b86313c5-475f-408d-977e-b9af9b9ad9fd"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MDG",
                                "text": "Madagascar",
                                "value": "fba5352d-3218-49a3-882c-bef2629e7e12"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MWI",
                                "text": "Malawi",
                                "value": "91e6af0e-2e6b-4f40-853b-1c391f649be0"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MYS",
                                "text": "Malaysia",
                                "value": "8e6bfb02-7912-47fd-88ec-9995f722c02b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MDV",
                                "text": "Maldives",
                                "value": "1f6a73fb-5980-4c5c-93b9-2d07497a1fff"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MLI",
                                "text": "Mali",
                                "value": "a0ea6eed-0f24-4151-94a0-850c880818de"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MLT",
                                "text": "Malta",
                                "value": "20716aef-7ef0-4886-a099-da2b15e3551a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MHL",
                                "text": "Marshall Islands",
                                "value": "77d32e9f-81ae-4bf5-96ad-140340ddcd8e"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MTQ",
                                "text": "Martinique",
                                "value": "cf0917ce-a3cf-4909-804c-11e89aa268c2"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MRT",
                                "text": "Mauritania",
                                "value": "0eafbfbd-a569-4f93-bbc9-3f58b3a917cd"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MUS",
                                "text": "Mauritius",
                                "value": "ba69dc50-d8d0-4dab-9ce2-b8e6abd67550"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MYT",
                                "text": "Mayotte",
                                "value": "4c9de336-8fa5-43dd-9647-4090dedea7f6"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MEX",
                                "text": "Mexico",
                                "value": "b357436c-a43d-4827-ad9f-59424c973349"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "FSM",
                                "text": "Micronesia, Federated States",
                                "value": "c41974fb-8121-4c03-a36f-da9e997c999e"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MDA",
                                "text": "Moldova",
                                "value": "2b5c77db-5ec6-4f24-94dd-51b84dab7723"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MCO",
                                "text": "Monaco",
                                "value": "b4e22bf6-7df0-4a0e-93a4-965be351ff6e"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MNG",
                                "text": "Mongolia",
                                "value": "07124930-730d-444b-9e04-1e628d970123"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MNE",
                                "text": "Montenegro",
                                "value": "943c5dd5-fcfb-4c0c-aaa2-f90127b35616"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MSR",
                                "text": "Montserrat",
                                "value": "4ee98fe5-1f6a-422f-a1bd-c9bc3c0edbe5"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MAR",
                                "text": "Morocco",
                                "value": "64f3103e-2004-48ec-b8ca-4daa9c7ee8d5"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MOZ",
                                "text": "Mozambique",
                                "value": "1fe5720d-3230-461f-b4bb-6834db33a864"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MMR",
                                "text": "Myanmar",
                                "value": "a041edff-b083-418c-9ea9-614a5c4f10c7"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NAM",
                                "text": "Namibia",
                                "value": "11233c3c-94a9-4eda-89cc-897fcff6d97d"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NRU",
                                "text": "Nauru",
                                "value": "760ae222-30ae-40a6-91e0-db515243ee30"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NPL",
                                "text": "Nepal",
                                "value": "f4a4ead7-f896-401d-a04b-70fc56c9620c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NLD",
                                "text": "Netherlands",
                                "value": "b1cc5546-49f8-4c08-97b9-ee9ca27de0d0"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ANT",
                                "text": "Netherlands Antilles",
                                "value": "07660705-c197-4bba-80eb-0b1b1b124005"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NCL",
                                "text": "New Caledonia",
                                "value": "19590e92-2662-4cfa-8b47-10a04012ac65"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NZL",
                                "text": "New Zealand",
                                "value": "a833297d-7228-4f0d-b647-a33e4b5f40e7"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NIC",
                                "text": "Nicaragua",
                                "value": "12a23bbe-6691-41d1-b186-527e2e1b1047"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NER",
                                "text": "Niger",
                                "value": "cd78e2f3-0d47-46da-8d0e-85706a559cc3"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NGA",
                                "text": "Nigeria",
                                "value": "fe1485df-0ba3-472f-8172-19051b97473c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NIU",
                                "text": "Niue",
                                "value": "b99ed306-a7f6-4d99-84e1-b696987f088f"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NFK",
                                "text": "Norfolk Island",
                                "value": "f75ed26c-d07f-49b8-8958-15a528cb0341"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PRK",
                                "text": "North Korea",
                                "value": "b0e66c95-d214-48ce-80a1-bf21a5deb121"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MNP",
                                "text": "Northern Mariana Islands",
                                "value": "bc18483f-b246-486d-a1ef-ba3166d17592"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "NOR",
                                "text": "Norway",
                                "value": "f7ba2826-533c-4a6a-85fa-514ffeee3d6a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "OMN",
                                "text": "Oman",
                                "value": "40c952d0-bbcb-4f87-8a8b-efa0116d9f12"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PAK",
                                "text": "Pakistan",
                                "value": "09e68698-036e-4f5a-b899-230a17c0c000"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PLW",
                                "text": "Palau",
                                "value": "97eee012-4c72-442d-961c-864bce753235"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PSE",
                                "text": "Palestine",
                                "value": "11101b07-7d4b-4835-9d13-fa7290d9bb07"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PAN",
                                "text": "Panama",
                                "value": "5dace59a-a767-4f08-8d9e-d7c43a5b544b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PNG",
                                "text": "Papua New Guinea",
                                "value": "bada06db-b3aa-4868-aea6-103464be4241"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PRY",
                                "text": "Paraguay",
                                "value": "6f9b02fe-1c61-41fe-9dd9-6aea55b52cdc"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PER",
                                "text": "Peru",
                                "value": "3980e6e0-e530-4fe3-b4b3-03b741a1abea"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PHL",
                                "text": "Philippines",
                                "value": "7b7ab804-e9b5-4494-94d1-66135cb42845"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PCN",
                                "text": "Pitcairn",
                                "value": "517607ad-19fb-4f1b-8850-400987187b4f"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "POL",
                                "text": "Poland",
                                "value": "c5c7bbe2-6ff6-47be-9078-bd4100f690a7"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PRT",
                                "text": "Portugal",
                                "value": "e3c7001b-1784-454f-a4bd-679ea5ea49b7"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "PRI",
                                "text": "Puerto Rico",
                                "value": "dab76df3-1c7b-4a40-b075-641cb13ca17c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "QAT",
                                "text": "Qatar",
                                "value": "5d7362e1-b744-4db1-8ed3-59b3b645de4b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "REU",
                                "text": "Réunion",
                                "value": "b24cde87-4f65-4b4b-beae-304ad45ab9a5"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ROM",
                                "text": "Romania",
                                "value": "69ac49a7-bc0f-4258-880e-e231dba9089a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "RUS",
                                "text": "Russia",
                                "value": "9d86653c-51c0-46c6-93ee-ed9178671c48"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "RWA",
                                "text": "Rwanda",
                                "value": "6f9d8e2c-fa72-4396-9d9d-31a93b12c1a0"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "BLM",
                                "text": "Saint Barthelemy",
                                "value": "9d4b2a05-145c-479f-acfa-e04c6d12c3d1"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SHN",
                                "text": "Saint Helena",
                                "value": "87e1bedd-a570-476e-a4fb-ef4d07dafbcf"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "KNA",
                                "text": "Saint Kitts and Nevis",
                                "value": "29d4665b-08c8-40ed-88d2-2bc62a152d45"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LCA",
                                "text": "Saint Lucia",
                                "value": "8a04ec58-5e7b-4c97-b798-7bbcc27b8715"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "MAF",
                                "text": "Saint Martin",
                                "value": "894c60fc-61f7-4f47-a76f-54b34e4f71e2"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SPM",
                                "text": "Saint Pierre and Miquelon",
                                "value": "1f0fcfe8-4b3d-477c-b8f6-49f70283e047"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "VCT",
                                "text": "Saint Vincent and the Grenadines",
                                "value": "4145e443-299a-4d9f-81a7-d2208ccd445c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "WSM",
                                "text": "Samoa",
                                "value": "6b4e95ca-30ca-4f85-baca-758804445ba3"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SMR",
                                "text": "San Marino",
                                "value": "91546c55-3143-407c-ac01-8ee9befadcdd"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "STP",
                                "text": "Sao Tome and Principe",
                                "value": "5133ddc6-6a7c-470a-8951-0cffd5c0e42f"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SAU",
                                "text": "Saudi Arabia",
                                "value": "bbde31dc-c91a-4ee6-bc87-3bc4240f4abe"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SEN",
                                "text": "Senegal",
                                "value": "7d4967a7-693d-434e-a493-9586bdf0ac07"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SRB",
                                "text": "Serbia",
                                "value": "0bbe1382-bdbc-452b-a8d6-d3413dbafa54"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SYC",
                                "text": "Seychelles",
                                "value": "a0b47e7b-80db-473a-b572-dad22f226c9b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SLE",
                                "text": "Sierra Leone",
                                "value": "c5c242b9-7889-4a33-b40e-7f81758f86ab"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SGP",
                                "text": "Singapore",
                                "value": "602a1ef7-4cd0-4c9c-9d63-cc17b2a2c949"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SXM",
                                "text": "Sint Maarten",
                                "value": "c71c7098-a25e-4c81-9206-10f4de27d0c3"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SVK",
                                "text": "Slovakia",
                                "value": "29c789fd-814e-49d9-a651-bded358658b2"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SVN",
                                "text": "Slovenia",
                                "value": "bed42b7d-7829-4a8c-92b5-957d8caef76a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SLB",
                                "text": "Solomon Islands",
                                "value": "17eda87a-9efb-461e-985c-458d04144952"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SOM",
                                "text": "Somalia",
                                "value": "f762ffd7-4c75-4d3e-a6fe-849cf7f91883"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ZAF",
                                "text": "South Africa",
                                "value": "29a7f1d9-c618-437b-ada6-22de36b8774a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SGS",
                                "text": "South Georgia and the South Sandwich Islands",
                                "value": "884919dc-9fd2-4067-a570-7b498434798b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "KOR",
                                "text": "South Korea",
                                "value": "d2ea5c63-b25c-422c-ace6-0dc546e73b85"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SSD",
                                "text": "South Sudan",
                                "value": "31112082-f607-4714-8787-e9632923981e"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ESP",
                                "text": "Spain",
                                "value": "3e2e4f7e-656b-452d-8c5d-f5871f9ce37d"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "LKA",
                                "text": "Sri Lanka",
                                "value": "9941d86a-c41c-4738-84c5-030d44e1e012"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SDN",
                                "text": "Sudan",
                                "value": "52611432-72e7-486f-b00c-c61275caf979"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SUR",
                                "text": "Suriname",
                                "value": "c2aba180-edec-4a52-923a-1d01c0b273b2"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SJM",
                                "text": "Svalbard and Jan Mayen",
                                "value": "7ae7b693-3f24-4eb8-9ba1-f9f2d949487b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SWZ",
                                "text": "Swaziland",
                                "value": "69c8019f-0ace-4ce5-8bda-f167380b1329"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SWE",
                                "text": "Sweden",
                                "value": "439931b1-d30f-4e09-bfae-13f9f08cf43b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "CHE",
                                "text": "Switzerland",
                                "value": "38e11a2f-a277-48e7-ae8f-e9dfd24597a4"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "SYR",
                                "text": "Syria",
                                "value": "f1b21931-3682-4244-b327-524774a2ebd7"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TWN",
                                "text": "Taiwan",
                                "value": "13a9ca93-35f1-4242-a3e7-99cbc2e3b4ba"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TJK",
                                "text": "Tajikistan",
                                "value": "f1078bf0-7d9e-4e12-84f7-e80a9dc1b1e6"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TZA",
                                "text": "Tanzania",
                                "value": "4ea8b8df-cd44-4519-ab7c-52ae8ee81d16"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "THA",
                                "text": "Thailand",
                                "value": "a4a17c1c-c476-49a6-ba38-03761c56030b"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TGO",
                                "text": "Togo",
                                "value": "015cba1e-e742-4e3d-aac6-067faa0a99c5"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TKL",
                                "text": "Tokelau",
                                "value": "2039dc60-28a0-4b6a-b4f3-57470c7fec1c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TON",
                                "text": "Tonga",
                                "value": "a0aa7b41-3779-471a-800f-59e311ef59b3"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TTO",
                                "text": "Trinidad and Tobago",
                                "value": "b29af078-6337-457b-a7ee-5e5b766063a4"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TUN",
                                "text": "Tunisia",
                                "value": "fe712830-2cf1-4336-b09e-69e6ab6be15a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TUR",
                                "text": "Turkey",
                                "value": "e1c4ce62-1629-4b68-803f-d3c9b8b56a9a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TKM",
                                "text": "Turkmenistan",
                                "value": "93419871-5cb4-4291-9f3d-58f01e4d6b89"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TCA",
                                "text": "Turks and Caicos Islands",
                                "value": "d834a426-fec9-41af-9fb2-38ab1039e679"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "TUV",
                                "text": "Tuvalu",
                                "value": "dc573c20-567f-46ff-938c-2925bd2d2823"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "UGA",
                                "text": "Uganda",
                                "value": "e0b38856-2338-477b-b734-1707785907d0"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "UKR",
                                "text": "Ukraine",
                                "value": "6d33db96-67d4-46d9-a8d5-adeea9953aec"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ARE",
                                "text": "United Arab Emirates",
                                "value": "c43970cc-3ba2-4f4c-908e-863e8ab287e5"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "GBR",
                                "text": "United Kingdom",
                                "value": "f5829b5b-853f-40b0-897c-1d2c6571755c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "USA",
                                "text": "United States",
                                "value": "94e7ea25-7acd-442b-88af-177114dab88a"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "UMI",
                                "text": "United States Minor Outlying Islands",
                                "value": "8821365a-e7ab-4e82-a7eb-30df888378d4"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "URY",
                                "text": "Uruguay",
                                "value": "f8938e9e-cc54-46b3-9a9f-e3ea9c798d84"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "UZB",
                                "text": "Uzbekistan",
                                "value": "6af69fce-fc24-4137-b879-ec062819f24f"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "VUT",
                                "text": "Vanuatu",
                                "value": "4b4d412a-9254-46ef-afe1-14e97f0cb52e"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "VAT",
                                "text": "Vatican (Holy See)",
                                "value": "c15c3484-6358-4945-892e-4525e70dca4c"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "VEN",
                                "text": "Venezuela",
                                "value": "a35a43dc-a5d2-4f63-bedc-454783b485fd"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "VNM",
                                "text": "Vietnam",
                                "value": "42717cd8-396d-40b6-9b76-4c1a8b1bad37"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "VGB",
                                "text": "Virgin Islands, British",
                                "value": "3cbed530-dcd7-41a0-97cd-6d093f34a6d9"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "VIR",
                                "text": "Virgin Islands, U.S.",
                                "value": "59c7b8a9-9222-4a7a-b7b4-09e6da0b2424"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "WLF",
                                "text": "Wallis and Futuna",
                                "value": "13ecb107-305f-41f2-87ec-3cc8582b37cb"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ESH",
                                "text": "Western Sahara",
                                "value": "ce004b8b-1047-472a-a073-6389646c8eb3"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "YEM",
                                "text": "Yemen",
                                "value": "f44de457-e3a4-493a-a065-a86024ae9fff"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ZMB",
                                "text": "Zambia",
                                "value": "cbb51cf5-2780-4339-8964-7b94fdbfbd1f"
                            },
                            {
                                "exclusive": true,
                                "countryCode": "ZWE",
                                "text": "Zimbabwe",
                                "value": "c15a5abc-10d5-47b0-9b9c-13b48d29de60"
                            }
                        ]
                    },
                    "placeholder": "Required",
                    "childStep": "StateId"
                }
            ],
            "title": "About You"
        },
        {
            "step": "form",
            "identifier": "contactInformation3",
            "text": "Contact Information 3 of 4",
            "isOptional": false,
            "formItems": [
                {
                    "identifier": "StateId",
                    "text": "State/Province",
                    "isOptional": true,
                    "placeholder": "Required",
                    "dependsOn": "CountryId",
                    "apiEndpoint": "geography/country/{dependsOn}/state",
                    "answerFormat": {
                        "type": "valuePicker",
                        "textChoices": [
                            {
                                "comment": "please do not modify this value. Its being used in code",
                                "value": "NotAvailable",
                                "text": ""
                            }
                        ]
                    }
                },
                {
                    "identifier": "City",
                    "text": "City",
                    "isOptional": true,
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "maximumLength": 60,
                        "autocapitalizationType": "words"
                    },
                    "placeholder": ""
                },
                {
                    "identifier": "PostalCode",
                    "text": "Postal Code",
                    "isOptional": true,
                    "placeholder": "",
                    "answerFormat": {
                        "type": "textAnswer",
                        "multipleLines": false,
                        "maximumLength": 20,
                        "invalidMessage": "That is an invalid entry",
                        "keyboardType": "numbersAndPunctuation",
                        "validationRegex": "^[a-zA-Z0-9 -]*$"
                    }
                }
            ],
            "title": "About You"
        },
        {
            "step": "form",
            "identifier": "contactInformation4",
            "title": "About You",
            "text": "Contact Information 4 of 4",
            "isOptional": true,
            "formItems": [
                {
                    "identifier": "PreferredContactMediumId",
                    "text": "Preferred Method of Contact",
                    "isOptional": true,
                    "answerFormat": {
                        "type": "valuePicker",
                        "textChoices": [
                            {
                                "value": "291975d8-3f54-4c02-bb84-edf1fddba138",
                                "text": "Phone"
                            },
                            {
                                "value": "dfb5141e-cd33-4eb0-abaf-ff1e76a1720e",
                                "text": "Email"
                            }
                        ]
                    }
                },
                {
                    "identifier": "MobilePhoneOSId",
                    "text": "Mobile Phone OS",
                    "isOptional": true,
                    "answerFormat": {
                        "type": "valuePicker",
                        "textChoices": [
                            {
                                "value": "d2bc083e-7e5b-4051-b77a-49160fd06f32",
                                "text": "Android Version 5.1+"
                            },
                            {
                                "value": "e8c48abd-711a-43ab-a2d9-bc302162ebf4",
                                "text": "Android Version 5.0 or Lower"
                            },
                            {
                                "value": "682c85be-da3f-4d09-b2a0-b5320423b78b",
                                "text": "IOS Version 10+"
                            },
                            {
                                "value": "0473f3a1-6083-4617-84c9-e2023acbeff0",
                                "text": "IOS Version 9 or Lower"
                            }
                        ]
                    }
                }
            ]
        },
        {
            "identifier": "privacy-policy",
            "text": "This “Privacy Policy” describes the privacy practices of N of 1 Health Research Platform a Software as a Service (SaaS) solution offered by Digital Infuzion, Inc. and our subsidiaries and affiliates.",
            "step": "visualConsent",
            "document": {
                "sections": [
                    {
                        "sectionTitle": "Privacy Policy",
                        "sectionSummary": "This “Privacy Policy” describes the privacy practices of N of 1 Health Research Platform a Software as a Service (SaaS) solution offered by Digital Infuzion, Inc. and our subsidiaries and affiliates.",
                        "sectionType": "custom",
                        "continueButtonTitle": "Next",
                        "sectionImage": {
                            "position": "top",
                            "src": "assets/images/informed-consent/Data-Privacy-Rights.svg"
                        },
                        "learnMoreButtonTitle": "Read the Privacy Policy",
                        "sectionHtmlContentKey": "privacy_policy"
                    }
                ]
            },
            "title": "Privacy Policy"
        },
        {
            "step": "consentReview",
            "identifier": "review-pp",
            "requiresAgreement": false,
            "requiresScrollToBottom": false,
            "instructions": "Review the Privacy Policy below, and tap Next if you're ready to accept.",
            "document": {
                "sections": [
                    {
                        "sectionTitle": "Privacy Policy",
                        "sectionType": "privacy",
                        "sectionHtmlContentKey": "privacy_policy"
                    }
                ],
                "title": ""
            }
        },
        {
            "step": "question",
            "identifier": "accept-pp",
            "title": "I accept the Privacy Policy.",
            "text": "To submit, you must accept the Privacy Policy.",
            "isOptional": false,
            "answerFormat": {
                "type": "textChoice",
                "style": "multiple",
                "textChoices": [
                    {
                        "text": "Yes",
                        "value": "IC3.IC3PPRES"
                    }
                ]
            }
        },
        {
            "step": "visualConsent",
            "identifier": "terms-of-use",
            "title": "Terms of Use",
            "text": "These “Terms of Use” govern the access to and use of the N of 1 Platform.",
            "document": {
                "sections": [
                    {
                        "continueButtonTitle": "Next",
                        "sectionType": "custom",
                        "sectionTitle": "Terms of Use",
                        "sectionSummary": "These “Terms of Use” govern the access to and use of the N of 1 Platform.",
                        "sectionImage": {
                            "position": "top",
                            "src": "assets/images/informed-consent/terms-of-use.svg"
                        },
                        "learnMoreButtonTitle": "Read the Terms of Use",
                        "sectionHtmlContentKey": "terms_of_use"
                    }
                ]
            }
        },
        {
            "identifier": "review-tou",
            "step": "consentReview",
            "requiresAgreement": false,
            "requiresScrollToBottom": false,
            "instructions": "Review the Terms of Use below, and tap Next if you're ready to accept.",
            "document": {
                "sections": [
                    {
                        "sectionTitle": "Terms of Use",
                        "sectionType": "custom",
                        "sectionHtmlContentKey": "terms_of_use"
                    }
                ]
            }
        },
        {
            "step": "question",
            "identifier": "accept-tou",
            "title": "I accept the Terms of Use.",
            "text": "To submit, you must accept the Terms of Use.",
            "isOptional": false,
            "answerFormat": {
                "type": "textChoice",
                "style": "multiple",
                "textChoices": [
                    {
                        "text": "Yes",
                        "value": "IC3.IC3TOURES"
                    }
                ]
            }
        },
        {
            "step": "instruction",
            "identifier": "registrationSubmission",
            "title": "Complete Enrollment",
            "continueButtonTitle": "Enroll",
            "text": "Press 'Enroll' to complete your enrollment.",
            "waitAlert": {
                "type": "Submit",
                "loadingTitle": "",
                "loadingMessage": "Enrolling New Participant",
                "title": "Something Went Wrong",
                "message": "Your enrollment request could not be submitted at this time. Please try again later.",
                "isOK": false
            }
        },
        {
            "step": "completion",
            "identifier": "completion",
            "title": "Now Let's Get Started!",
            "text": "Here is what happens next: \n\n1. Check your email for the next steps to finish creating your account and log in.\n\n2. Sign the Informed Consent by entering your Username and Password.\n\n3. Begin entering your data and contributing to the growing information on FOP.",
            "backButtonItemIsHidden": true
        }
    ],
    "sectionHTMLContentEndpoint": "study/publicContent"
}