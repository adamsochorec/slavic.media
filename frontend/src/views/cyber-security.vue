<script setup>
import { onMounted, ref } from "vue";

const showreel = ref([
  {
    id: "672a34ff4fab7b81aa0707e7",
    author: {
      thumbnail: "https://cdn.slavic.media/img/adam",
      name: "Adam Sochorec",
      url: "https://www.linkedin.com/in/adamsochorec/",
    },
    metadata: {
      date: "August 2022",
      keywords: [
        "Cybersecurity",
        "Online Security",
        "Two-Factor Authentication",
        "Social Engineering",
        "Password Manager",
        "2FA",
        "Digital Privacy",
        "Password Strength",
        "Personal Information Protection",
      ],
      linkedin: "",
      thumbnail: "https://cdn.slavic.media/img/2022-08-15-00345",
      length: 15,
    },
    content: [
      "<h2 class='reveal'>Essential Steps Leading to Your Secure and Healthy Online Presence</h2>",
      "<iframe background='transparent' src='https://lottie.host/embed/19202777-715b-4539-8f9c-b15c7c9fd299/Y2uxrYvdro.lottie'></iframe>",
      "<hr class='reveal' role='separator'><h3 class='reveal'>1. Contemporary Passwords <i class='pi pi-key'></i></h3><p class='drop-cap reveal'>The most effective way today to hack someone's identity is to 'social engineer,' guessing passwords based on public information like date of birth or house number, often found on social media.</p><p class='reveal'>By using complex, non-organic passwords for each account, you reduce the risk of exposure through public information on sites like Facebook or Instagram.</p><p class='reveal'>Using unique passwords for each account creates layers of security against hackers who could otherwise exploit a single password.</p><p class='reveal'>For managing these complex passwords, a reliable password manager is essential—keeping them on an unprotected document defeats the purpose.</p>",
      "<hr class='semi reveal' role='separator'><hr class='semi reveal' role='separator'><h4 class='reveal'>1.2 Password Strength</h4><form class='reveal' id='password-strength-form' action='' method='get' accept-charset='utf-8' spellcheck='false' autocomplete='off'><input id='myPassword' type='password' value='' autocomplete='off'/></form><p class='flex-center reveal'>↑ <span class='note'>This tool is safe to interact with. Everything is processed locally - no data is sent or stored.</span></p><p class='reveal'>Password hacking now relies heavily on common words or phrases rather than purely on computational power.</p>",
      "<hr class='semi reveal' role='separator'><h4 class='reveal'>1.3 Problem Solution <i class='pi pi-verified'></i></h4><ul class='reveal'><li>Set up a trusted and encrypted password manager.</li><ul><li><a target='_blank' rel='noopener noreferrer' href='https://www.apple.com/legal/privacy/data/en/icloud-keychain/'>iCloud Keychain</a> for <i class='pi pi-apple'></i> users</li><li><a target='_blank' rel='noopener noreferrer' href='https://www.lastpass.com/how-lastpass-works'>LastPass</a> or <a target='_blank' rel='noopener noreferrer' href='https://www.keepersecurity.com/en_GB/'>Keeper</a> for <i class='pi pi-android'></i> <i class='pi pi-microsoft'></i> users</li></ul><li>Generate strong passwords with your manager or <a target='_blank' rel='noopener noreferrer' href='#passwordGenerator'>password generator</a></li><li>Store these securely in your password manager</li><li>Remember the master password or get a <a target='_blank' rel='noopener noreferrer' href='https://www.tomsguide.com/news/usb-security-key'>hardware key</a></li></ul>",
      "<hr class='reveal' role='separator'><h3 class='reveal'>2. What Is 2FA and Why Is It Essential</h3><p class='reveal'>Two-factor authentication (2FA) adds a second layer of security by requiring a one-time code, sent to your device, in addition to your password.</p><p class='reveal'>Even if your login credentials are stolen, the hacker would still need this code to gain access.</p><p class='reveal'>Be sure to save your recovery codes in case you lose access to your phone or email; they’re a safeguard for account recovery.</p>",
      "<hr class='semi reveal' role='separator'><h4 class='reveal'>2.2 What Is SIM Swapping</h4><p class='reveal'>SIM swapping allows hackers to gain control over your phone number, bypassing SMS-based 2FA. Use app-based 2FA to reduce this risk.</p>",
      "<hr class='reveal' role='separator'><h3 class='reveal'>3. Social Engineering Vulnerability</h3><p class='reveal'>Keep your personal information private, and avoid using easily guessable information like birthdays or pet names for your passwords.</p><p class='reveal'>Before sharing any information online, consider its necessity for the service or app, and limit access where possible.</p>",
      "<hr class='semi reveal' role='separator'><h4 class='reveal'>3.2 Problem Solution <i class='pi pi-verified'></i></h4><ul class='reveal'><li>Manage your online footprint and keep sensitive information private</li><li>Be mindful of sharing unnecessary personal details online</li><li>Use randomized, non-organic passwords</li><li>Stay informed about social engineering tactics</li></ul>",
      "<hr class='reveal' role='separator'><h3 class='reveal'>4. Related Literature <i class='pi pi-book'></i></h3><ul><li class='reveal'><a target='_blank' rel='noopener noreferrer' href='https://open.spotify.com/episode/2hJsSOoQkgnlQLEFrdBVFp?si=06ff9cdeb3da4cbc'>Story about a professional social engineer</a></li><li class='reveal'><a target='_blank' rel='noopener noreferrer' href='https://open.spotify.com/episode/4q0cNkAHQQMBTu4NmeNW7E?si=a4c35c68a1d34724'>Google's control over the internet</a></li><li class='reveal'><a target='_blank' rel='noopener noreferrer' href='https://authy.com/blog/authy-vs-google-authenticator/'>Authy vs. Google Authenticator</a></li><li class='reveal'><a target='_blank' rel='noopener noreferrer' href='https://www.omnicalculator.com/other/password-entropy'>Password Entropy Calculator</a></li><li class='reveal'><a target='_blank' rel='noopener noreferrer' href='https://open.spotify.com/episode/5Snektk5Z2nUzM7DgoEBSx?si=eKX_d1f1SY6T3j5S3mkLgA'>Hacking backstage</a></li></ul>",
    ],
    title: "Cybersecurity Hygiene",
    slug: "cybersecurity-hygiene",
  },
]);
</script>
<template></template>
