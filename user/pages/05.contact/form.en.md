---
title: Contact

form:
    name: contact
    fields:
        name:
          label: Name
          placeholder: Enter your name
          autocomplete: on
          type: text
          validate:
            required: true
        email:
          label: Email
          placeholder: Enter your email address
          type: email
          validate:
            required: true
        message:
          label: Message
          placeholder: Enter your message
          type: textarea
          validate:
            required: true
        g-recaptcha-response:
          label: Captcha
          type: captcha
          recaptcha_not_validated: 'Captcha not valid!'
    buttons:
        submit:
          type: submit
          value: Submit
        reset:
          type: reset
          value: Reset
    process:
        captcha: true
        save:
            fileprefix: contact-
            dateformat: Ymd-His-u
            extension: txt
            body: "{% include 'forms/data.txt.twig' %}"
        email:
            subject: "[Site Contact Form] {{ form.value.name|e }}"
            body: "{% include 'forms/data.html.twig' %}"
        message: Thank you for getting in touch!
        display: thankyou
---
Contacts

Residence Chalet Help

fraction Rochemolles, 49
10052 Bardonecchia (TO)

Email: info@chaletdellaguida.it

Phone +39 0122 999670 / +39 0122 999752
Mobile: +39 347 8820958
Fax +39 0122 860226
