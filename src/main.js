(function () {
  const data = window.portfolioContent;

  if (!data) {
    return;
  }

  const STORAGE_KEY = "portfolio-language";
  const ALL_GROUP = "__all";
  const orbitTools = [
    { name: "Tinkercad", category: "3D / Circuit", image: "assets/images/tools/tinkercad.svg", color: "#ff7a18" },
    { name: "Eagle", category: "PCB", image: "assets/images/tools/eagle.svg", color: "#ff8a3d" },
    { name: "Microsoft 365", category: "Productivity", image: "assets/images/tools/microsoft-365.svg", color: "#2563eb" },
    { name: "Microsoft Office", category: "Office", image: "assets/images/tools/microsoft-office.svg", color: "#ea580c" },
    { name: "Outseal PLC", category: "PLC", image: "assets/images/tools/outseal-plc.svg", color: "#22c55e" },
    { name: "PSIM", category: "Simulation", image: "assets/images/tools/psim.png", color: "#facc15" },
    { name: "VS Code", category: "Code", image: "assets/images/tools/vscode.svg", color: "#4fc3ff" },
    { name: "Apps Script", category: "Automation", image: "assets/images/tools/appsscript.svg", color: "#6f93ff" },
    { name: "EasyEDA", category: "PCB", image: "assets/images/tools/easyeda.svg", color: "#f2c94c" },
    { name: "Arduino", category: "Board", image: "assets/images/tools/arduino.svg", color: "#18b6c9" },
    { name: "ESP", category: "IoT", image: "assets/images/tools/esp.svg", color: "#b2c5ff" },
    { name: "Proteus", category: "Simulation", image: "assets/images/tools/proteus.svg", color: "#8edcff" },
    { name: "Inventor", category: "CAD", image: "assets/images/tools/autodesk-inventor.svg", color: "#ff8a65" },
    { name: "Cirkit Designer", category: "Circuit IDE", image: "assets/images/tools/cirkitdesigner.png", color: "#8ab4f8" },
  ];
  const orbitToolMap = new Map(orbitTools.map((tool) => [tool.name, tool]));
  const orbitCoreTools = [
    { name: "React", shortLabel: "R", color: "#61dafb", image: "assets/images/tools/react.svg" },
    { name: "Vite", shortLabel: "V", color: "#8b5cf6", image: "assets/images/tools/vite.svg" },
    { name: "JavaScript", shortLabel: "JS", color: "#f7df1e", image: "assets/images/tools/javascript.svg" },
    { name: "TypeScript", shortLabel: "TS", color: "#3178c6", image: "assets/images/tools/typescript.svg" },
    { name: "HTML", shortLabel: "HTML", color: "#e34f26", image: "assets/images/tools/html5.svg" },
    { name: "CSS", shortLabel: "CSS", color: "#1572b6", image: "assets/images/tools/css.svg" },
    { name: "Tailwind CSS", shortLabel: "TW", color: "#38bdf8", image: "assets/images/tools/tailwindcss.svg" },
    { name: "Lucide React", shortLabel: "LR", color: "#d7deff", image: "assets/images/tools/lucide.svg" },
    { name: "Express.js", shortLabel: "EX", color: "#d5e0da", image: "assets/images/tools/express.svg" },
    { name: "Firebase", shortLabel: "FB", color: "#ffca28", image: "assets/images/tools/firebase.svg" },
    { name: "JSON Database", shortLabel: "JDB", color: "#8ab4f8", image: "assets/images/tools/json.svg" },
    { name: "Google Sheets", shortLabel: "GS", color: "#34a853", image: "assets/images/tools/googlesheets.svg" },
    { name: "Google Drive", shortLabel: "GD", color: "#0f9d58", image: "assets/images/tools/googledrive.svg" },
    { name: "Google Apps Script", shortLabel: "GAS", color: "#6f93ff", image: "assets/images/tools/appsscript.svg" },
    { name: "Chart.js", shortLabel: "CJ", color: "#36a2eb", image: "assets/images/tools/chartdotjs.svg" },
    { name: "Recharts", shortLabel: "RC", color: "#22d3ee", image: "assets/images/tools/recharts.svg" },
  ];
  const orbitCoreToolMap = new Map(orbitCoreTools.map((tool) => [tool.name, tool]));
  const skillVisuals = new Map([
    ...orbitCoreTools.map((tool) => [tool.name, tool]),
    ["Arduino / ESP32", { name: "Arduino / ESP32", shortLabel: "ARD", color: "#18b6c9", image: "assets/images/tools/arduino.svg" }],
    ["Sensors & Actuators", { name: "Sensors & Actuators", shortLabel: "I/O", color: "#5eead4", image: "assets/images/tools/sensors-actuators.svg" }],
    ["Relay / Driver Control", { name: "Relay / Driver Control", shortLabel: "RLY", color: "#f59e0b", image: "assets/images/tools/relay-driver-control.svg" }],
    ["Serial Communication", { name: "Serial Communication", shortLabel: "UART", color: "#93c5fd", image: "assets/images/tools/serial-communication.svg" }],
    ["Rapid Prototyping", { name: "Rapid Prototyping", shortLabel: "RPD", color: "#f472b6", image: "assets/images/tools/rapid-prototyping.svg" }],
    [
      "HTML, CSS, JavaScript",
      {
        name: "HTML, CSS, JavaScript",
        shortLabel: "WEB",
        color: "#f59e0b",
        images: ["assets/images/tools/html5.svg", "assets/images/tools/css.svg", "assets/images/tools/javascript.svg"],
      },
    ],
    [
      "React / Vite",
      {
        name: "React / Vite",
        shortLabel: "RV",
        color: "#61dafb",
        images: ["assets/images/tools/react.svg", "assets/images/tools/vite.svg"],
      },
    ],
    [
      "Git / GitHub",
      {
        name: "Git / GitHub",
        shortLabel: "GH",
        color: "#d5e0da",
        images: ["assets/images/tools/git.svg", "assets/images/tools/github.svg"],
      },
    ],
    ["Figma", { name: "Figma", shortLabel: "FG", color: "#f24e1e", image: "assets/images/tools/figma.svg" }],
    [
      "Google Sheets / Drive",
      {
        name: "Google Sheets / Drive",
        shortLabel: "GSD",
        color: "#34a853",
        images: ["assets/images/tools/googlesheets.svg", "assets/images/tools/googledrive.svg"],
      },
    ],
    ["Testing & Iteration", { name: "Testing & Iteration", shortLabel: "QA", color: "#38bdf8", image: "assets/images/tools/testing-iteration.svg" }],
    ["Dashboard UI Flow", { name: "Dashboard UI Flow", shortLabel: "UI", color: "#8b5cf6", image: "assets/images/tools/dashboard-ui-flow.svg" }],
  ]);
  const projectLocale = {
    en: {
      "alga-sistem-indoor-untuk-pertumbuhan-alga": {
        title: "ALGA - Indoor Algae Growth System",
        category: "Electronics / Environmental Control",
        summary: "An Arduino-based indoor system prototype that keeps temperature and CO2 levels stable for algae growth by controlling a fan and heater automatically.",
        problem: "Indoor algae cultivation needs a stable environment, especially temperature and CO2 balance. When either value drifts too far, growth quality can drop significantly.",
        solution: "I built an Arduino-powered environmental control system that reads temperature and CO2 in real time, shows both values on an LCD, and switches the fan or heater automatically when the room condition changes.",
        built: [
          "Designed an Arduino Uno-based indoor prototype for algae growth.",
          "Integrated an MQ-135 sensor to read indoor CO2 levels.",
          "Used a DS18B20 sensor to monitor ambient temperature.",
          "Displayed temperature and CO2 values in real time on a 16x2 LCD.",
          "Built an automatic fan control that turns on when CO2 or temperature gets too high.",
          "Built a heater control that activates when temperature drops below the minimum threshold.",
          "Structured the program logic around temperature and CO2 thresholds needed for algae growth conditions.",
        ],
        result: [
          "The system can monitor temperature and CO2 levels in real time.",
          "The fan turns on automatically when temperature or CO2 exceeds the limit.",
          "The heater activates automatically when temperature drops too low.",
          "The LCD shows live environmental condition data.",
          "The prototype can serve as a foundation for a more stable and controlled indoor algae cultivation system.",
        ],
      },
      "rasimulino-web-based-arduino-simulator": {
        title: "RaSimulino - Web-Based Arduino Simulator",
        category: "Web / Educational Simulator",
        summary: "A React-based Arduino simulation web app where users can pick a board, add virtual components, write Arduino-style logic, run the simulation, and inspect the output through a live serial monitor. The product is still under active development.",
        problem: "Arduino learning often starts with physical components, wiring, and a real board. That can make it harder for beginners who first need to understand the programming logic before touching hardware.",
        solution: "I built a browser-based Arduino simulator around the idea of Logic First, Wiring Later. Users can choose a board, add virtual modules, write Arduino-style code, and run a simulation to see visual output changes and serial monitor logs instantly.",
        built: [
          "Built a React and Vite web app with a modern simulator interface.",
          "Added board options for Arduino Nano, Arduino Uno, and Arduino Mega 2560.",
          "Created a virtual component library including LED, relay, buzzer, servo, analog sensor, potentiometer, LDR, push button, toggle switch, and a 16x2 I2C LCD.",
          "Built a compact module rack workspace to display the modules used in the simulation.",
          "Added a code editor with syntax highlighting for writing Arduino-style logic.",
          "Provided Arduino-style APIs such as digitalWrite, digitalRead, analogRead, analogWrite, servoWrite, lcdPrint, lcdClear, serialPrint, and delay.",
          "Built a serial monitor to display runtime output.",
          "Used Zustand to manage board, pin, component, sensor input, digital output, PWM, servo, LCD, and serial log state.",
          "Added LocalStorage persistence so simulator configurations stay saved locally.",
          "Added loop validation to prevent the simulator from freezing when users write while-true loops without an awaited delay.",
        ],
        result: [
          "Users can simulate Arduino logic directly in the browser.",
          "The system shows digital output, PWM, servo, LCD, and serial monitor changes interactively.",
          "Boards and virtual components can be selected based on simulation needs.",
          "Analog and digital inputs can be manipulated to test program behavior.",
          "The app helps users understand Arduino programming logic before doing physical wiring.",
          "The prototype can become a foundation for a more complete web-based Arduino learning platform.",
          "The website is still under active development.",
        ],
      },
      "custom-saklar-vario-125-berbasis-arduino": {
        title: "Arduino-Based Vario 125 Custom Switch System",
        category: "Embedded System / Automotive Electronics",
        summary: "A custom switch-holder prototype for the Vario 125 that replaces stock and extra controls with digital buttons, an Arduino Mega, and a 16-channel relay module to handle lights, indicators, horn, starter, ignition, engine cut-off, and extra riding modes.",
        problem: "Motorcycle electrical modifications with many extra features often create messy wiring and scattered controls, making the system hard to organize and difficult to operate from a single integrated switch holder.",
        solution: "I designed an Arduino-based switch system that reads 17 input buttons and drives 16 relay outputs with different behaviors such as momentary, latching, multi-click, and stop-trigger logic depending on each motorcycle function.",
        built: [
          "Designed a custom button-holder system for the Vario 125 motorcycle.",
          "Used an Arduino Mega 2560 as the central controller for inputs and outputs.",
          "Mapped 17 input buttons for lights, indicators, starter, ignition, horn, engine cut-off, and extra modes.",
          "Integrated a 16-channel relay module as the actuator layer for the motorcycle electrical loads.",
          "Built momentary button logic for the starter, horn, leveling, and dim light.",
          "Built latching logic for spotlights, matrix mode, ignition, engine cut-off, ECU mode, and free outputs.",
          "Added a multi-click light feature to switch between parking light and headlight behavior.",
          "Added a virtual hazard feature by activating the left and right indicator relays together.",
          "Added button debouncing for more stable input reading.",
        ],
        result: [
          "The system can control 16 relay outputs from 17 buttons in a structured way.",
          "Lights, indicators, hazard, horn, starter, ignition, and extra modes can all be controlled from the custom switch holder.",
          "Wiring becomes more centralized because each function is managed through the Arduino and relay layer.",
          "Button behavior can be tailored to the need, including hold, toggle, multi-click, and stop-trigger logic.",
          "The prototype can serve as a foundation for a cleaner, more modular, and easier-to-expand custom motorcycle switch system.",
        ],
      },
      "df-player-inklusif": {
        title: "Inclusive DF Player",
        category: "Assistive Technology / Embedded Audio System",
        summary: "A portable audio device for inclusive learning media that plays sound files from an SD card through DFPlayer Mini, uses push buttons for simple interaction, and runs on a rechargeable battery system.",
        problem: "Inclusive learning tools often need a simple, portable audio device that can play spoken instructions without relying on smartphones, internet access, or complicated control systems.",
        solution: "I created a standalone audio module based on DFPlayer Mini. The system reads audio files from an SD card, uses button-based interaction for playback and volume control, and includes a rechargeable battery for portable use.",
        built: [
          "Designed a portable audio system using DFPlayer Mini as the MP3 playback module.",
          "Integrated an SD card as the storage medium for audio files.",
          "Added a PAM8403 module to amplify the audio signal to the speaker.",
          "Used a 4 ohm 3 watt speaker as the sound output.",
          "Built the power system with a 3.7V Li-Ion battery and a TP4056 charging module.",
          "Added a switch to disconnect and reconnect the main power line.",
          "Used a push button as the main control for audio playback.",
          "Designed button logic for single press playback, long press repeat playback, and longer press volume adjustment.",
        ],
        result: [
          "The device can play audio files from the SD card independently.",
          "The system can be used without internet access or additional devices.",
          "The push-button interaction keeps the tool simple and easy to use.",
          "The speaker output can be amplified through the PAM8403 module.",
          "The rechargeable battery makes the device more practical and portable.",
          "The prototype can function as a practical and independent audio-based inclusive learning medium.",
        ],
      },
      "smart-footwork-system": {
        title: "Smart Footwork System",
        category: "IoT / Sports Training Dashboard",
        summary: "A smart 9-point footwork mat for pencak silat training that combines pressure sensors, RGB LED cues, buzzer feedback, and a web dashboard for training control and athlete performance analysis.",
        problem: "Footwork training is still commonly done manually, so reaction speed, stepping accuracy, movement consistency, and athlete development are difficult to measure objectively in real time.",
        solution: "I built a 3x3 smart mat with pressure sensing on each tile. RGB LEDs provide movement cues, the buzzer gives instant feedback, and the dashboard manages sessions while visualizing footwork performance data.",
        built: [
          "Designed a 9-point training mat with each tile sized at 40 cm x 40 cm and about 2.5 cm thick.",
          "Integrated a load cell on every mat point to detect stepping pressure.",
          "Used an ADS1256 ADC module to process the pressure sensor signals.",
          "Added WS2812 RGB LEDs as visual indicators on each mat point.",
          "Used an ESP32 as the main microcontroller for reading sensors and controlling outputs.",
          "Added a buzzer for audio feedback when training starts or a response is detected.",
          "Used an LED P10 panel to display the timer and reaction-time information.",
          "Built a web dashboard to control training patterns, duration, intensity, and session flow.",
          "Provided horizontal, vertical, circular, cross, diagonal, and random training modes.",
          "Built performance visualizations for reaction time, accuracy, charts, accuracy distribution, and training history.",
        ],
        result: [
          "The system can provide visual footwork cues through RGB LEDs on all 9 mat points.",
          "The pressure sensors can read the athlete's stepping response at each point.",
          "The dashboard can control training sessions with start, pause, resume, and stop features.",
          "Athletes can train with multiple footwork patterns and different intensity levels.",
          "Performance data such as reaction time, accuracy, session totals, and consistency can be visualized on the dashboard.",
          "The prototype can become a foundation for a more interactive and measurable data-driven pencak silat training tool.",
        ],
      },
      "gyro-head-sensor-based-angle": {
        title: "Gyro Head Sensor-Based Angle",
        category: "IoT / Wearable Sports Technology",
        summary: "A wearable swimming sensor that monitors head angle in real time using an IMU, gives immediate vibration and buzzer feedback, and sends training data to a web dashboard.",
        problem: "Head position in swimming is often evaluated visually by the coach, so mistakes like lifting or dropping the head too much are hard to track objectively, consistently, and in real time.",
        solution: "I created a head-mounted wearable that reads pitch angle from an IMU. When the head position moves outside the ideal range, the device triggers haptic and sound feedback while sending session data to a web dashboard.",
        built: [
          "Designed a wearable device meant to be mounted on the swimmer's head.",
          "Used an MPU9250 gyroscope and accelerometer to read head angle.",
          "Used an ESP32-C3 as the main microcontroller to process sensor data.",
          "Added a coin vibration motor as haptic feedback when head position is not ideal.",
          "Added a buzzer as a sound indicator and for debugging.",
          "Used a 2N2222 transistor as a driver to strengthen the vibration motor current.",
          "Built a portable power system using a 3.7V LiPo battery and a TP4056 charger module.",
          "Built a web dashboard to display pitch angle, position status, real-time graphs, latency, and an activity log.",
          "Added 0-degree calibration, sensitivity selection, training session mode, session history, and CSV export.",
        ],
        result: [
          "The system can monitor the swimmer's head angle in real time.",
          "The dashboard can show whether head position is normal, too high, or too low.",
          "The vibration motor and buzzer can provide immediate warnings when head position is not ideal.",
          "Head-position violations can be counted based on High and Low categories.",
          "Training session history can be stored and exported for athlete performance analysis.",
          "The prototype can become a foundation for a wearable, data-driven swimming technique evaluation tool.",
        ],
      },
      "kindreach-platform-anti-bullying-sekolah": {
        title: "KindReach - School Anti-Bullying Platform",
        category: "Web / Education Safety Platform",
        summary: "A mobile-style web app prototype that gives schools a safer digital space through bullying reports, KindBot guidance, interactive KindQuest learning, SOS access, and follow-up dashboards for counselors and school admins.",
        problem: "Bullying cases at school are often underreported because students feel unsafe, unsure where to go, or worried that their identity will be exposed. Schools also need a cleaner way to receive and follow up reports.",
        solution: "I designed KindReach as a school-focused web platform with a mobile-app feel. Students can file safe reports, choose anonymous mode, get early support through KindBot, and school staff can manage case progress through a dedicated dashboard.",
        built: [
          "Designed the interface as a smartphone-like app simulation so the experience feels familiar to students.",
          "Built flows for splash screen, welcome screen, institution registration, student login, counselor login, and school admin login.",
          "Built a reporting page for incident type, location, chronology, priority, reporter role, evidence, and anonymous mode.",
          "Created KindBot as a simulated conversation companion for safe early guidance.",
          "Created KindQuest as an interactive learning feature built around missions and anti-bullying scenario simulations.",
          "Added an SOS button as a quick-help feature for urgent situations.",
          "Built a school staff dashboard to view total reports, priority reports, case status, search, filters, and chronology details.",
          "Separated access rights between counselors and school admins during verification, handling, and case resolution.",
          "Integrated a local Express.js backend to store, fetch, and update report data.",
          "Added a demo fallback so the app can still run even when the local backend is inactive.",
        ],
        result: [
          "The app can simulate the anti-bullying reporting flow from the student side to school staff follow-up.",
          "New student reports can appear in the counselor or school admin dashboard.",
          "Report status can be updated to Waiting for Verification, Verified, In Process, and Completed.",
          "Students can view the history and status of the reports they have submitted.",
          "KindQuest and KindBot make the app function not only as a reporting system, but also as an educational and guidance medium.",
          "The prototype can become a foundation for a safer, more responsive, and more integrated school anti-bullying platform.",
        ],
      },
      "sipenbad-sistem-informasi-penerbangan-ad": {
        title: "SIPENBAD - Army Aviation Information System",
        category: "Web / Management Dashboard",
        summary: "A web application prototype that helps manage Army aviation data such as helicopters, aircraft, document reports, vehicle condition, location, and readiness status through a centralized digital dashboard.",
        problem: "Tracking helicopters, aircraft documents, vehicle condition, and operational locations becomes slow and fragmented when handled manually. Admins need a single dashboard where the data is searchable and easier to manage.",
        solution: "I built SIPENBAD as a web-based management dashboard with admin and guest access, summary statistics, unit-based navigation, search, document upload, and operational status tracking for aviation assets.",
        built: [
          "Built a login page with two access modes: admin and guest.",
          "Developed a main dashboard to show total reports, total helicopters, and total aircraft.",
          "Built statistical charts to visualize aviation data.",
          "Added unit navigation for Skadron 11, Skadron 12, Skadron 13, Skadron 21, Skadron 31, LANUMAD, and LANUDAD.",
          "Built search by registration number, vehicle type, or notes.",
          "Built a document upload form with date, category, vehicle type, registration number, condition, location, document, and notes fields.",
          "Integrated Google Sheets as the data store.",
          "Integrated Google Drive as the document storage layer.",
          "Added data actions such as view, download, and delete for admin users.",
        ],
        result: [
          "The system can display aviation data in one centralized dashboard.",
          "Admins can upload and manage aircraft reports digitally.",
          "Users can search data by registration number, vehicle type, or notes.",
          "Vehicle condition data such as FLYBEL and GROUNDED can be monitored more easily.",
          "Guest mode lets users view data without changing system contents.",
          "The prototype can become a foundation for a cleaner and more digitized Army aviation data management system.",
        ],
      },
      "simpres-sistem-informasi-personel": {
        title: "SIMPRES - Personnel Information System",
        category: "Web / Personnel Management System",
        summary: "A personnel management web prototype for monitoring assignments, education, command status, leave, and permits through searchable records, form input, document upload, and statistical dashboards.",
        problem: "Personnel records such as education, assignment, command status, and leave need a structured system. Manual tracking makes it harder to search records, manage files, and keep each status updated efficiently.",
        solution: "I built a web-based personnel information system powered by Google Sheets and Google Drive. It includes login, dashboard statistics, category filters, search, personnel forms, document upload, and record deletion workflows.",
        built: [
          "Built a password-based login page to restrict access.",
          "Added a session-token system with expiration time for safer access control.",
          "Built a statistics dashboard to show record counts by category.",
          "Created personnel data categories such as Education, Assignment, Under Command, and Leave / Permit.",
          "Built a personnel data form with fields for name, NRP, rank, position, category, SPRIN number, activity detail, date, and status.",
          "Integrated Google Sheets as the personnel data store.",
          "Integrated Google Drive for uploading supporting documents such as SPRIN files.",
          "Built a search feature based on name or NRP.",
          "Built filtering by personnel category.",
          "Added metadata such as Row ID, created time, and updated time.",
          "Built data deletion along with related document file management.",
        ],
        result: [
          "The system can store and display personnel data digitally.",
          "Data can be grouped by education, assignment, under-command status, and leave or permit.",
          "Users can find personnel records faster through name or NRP search.",
          "Supporting documents can be uploaded and accessed through the system.",
          "The dashboard makes it easier to monitor record totals in each category.",
          "The prototype can become a foundation for a more efficient, structured, and easy-to-use personnel administration system.",
        ],
      },
      "smart-sanda-target": {
        title: "Smart Sanda Target",
        category: "IoT / Sports Performance Dashboard",
        summary: "A smart sanda target prototype that measures kick location, force, and speed in real time using FSR sensors, MPU6050 motion sensing, ESP-NOW communication, and a web dashboard for performance analysis.",
        problem: "Sanda kick training is still commonly evaluated by observation alone, making it difficult to measure kick force, speed, target accuracy, repetition, and athlete consistency in an objective way.",
        solution: "I built an IoT striking target with multiple FSR zones and foot-mounted motion sensing. The system captures impact and movement data, sends it wirelessly, and visualizes athlete performance through a browser-based dashboard.",
        built: [
          "Designed a target dummy prototype with 12 sensor points across the head, chest, abdomen, body sides, and back.",
          "Used FSR sensors to detect pressure or kick impact at each target point.",
          "Used a CD74HC4067 multiplexer to combine 12 FSR inputs into one ESP32 ADC pin.",
          "Used a 10K resistor on each FSR as a voltage divider so pressure data can be read by the ADC.",
          "Used an ESP32 DEV1 as the main unit on the target to read sensors and receive data from the foot devices.",
          "Built wearable foot sensors for the right and left foot using ESP32-C3 and MPU6050 modules.",
          "Used the MPU6050 to read foot acceleration as an indicator of kick speed score.",
          "Connected the foot devices to the target unit through ESP-NOW wireless communication.",
          "Built a web dashboard to show impact score, speed score, total kicks, average power, max power, connection status, timer, and performance charts.",
          "Added training session controls such as start, pause, reset, and CSV export.",
          "Added a 12-zone target visualization to show the latest kick zone in real time.",
        ],
        result: [
          "The system can detect kick location across 12 target points on the sanda dummy.",
          "The system can display impact and speed scores in real time.",
          "The dashboard can recap total kicks, average power, and maximum power.",
          "Performance charts help coaches review kick power development across a session.",
          "Training data can be downloaded in CSV format for documentation or further analysis.",
          "The prototype can become a foundation for a more objective, interactive, and measurable data-driven sanda training tool.",
        ],
      },
      "startblock-renang-analisis": {
        title: "Swimming Start Block Analyzer",
        category: "IoT / Sports Force Analysis",
        summary: "A smart swimming start-block prototype that analyzes push-off force during starts using load cells, a 24-bit ADC for precise sensing, and a TFT touchscreen to display force, peak force, and force-vs-time graphs.",
        problem: "Swimming starts are still often judged visually, making it hard to measure push force, peak force, and pressure patterns objectively and consistently during training.",
        solution: "I designed a smart start block with multiple load cells, high-resolution ADC reading, and an onboard TFT display so coaches can inspect push-force values and time-based force graphs directly from the device.",
        built: [
          "Designed a sensing platform on the start block with an anti-slip surface for the athlete's foot placement.",
          "Used four 50 kg load cells to read pressure distribution on the start-block platform.",
          "Integrated an ADS1256 24-bit ADC module for more precise load-cell signal reading.",
          "Used an ESP32-S2 as the main microcontroller to process pressure data.",
          "Displayed force, peak force, and force-vs-time graphs on a 480x320 TFT LCD.",
          "Added a buzzer as sound feedback when the system powers on or measurement begins.",
          "Built a portable power system using a 3.7V Li-Ion battery and a TP4056 charger module.",
          "Added an ON-OFF switch for primary power control.",
          "Designed a handheld control-console concept so coaches can review the analysis data directly.",
        ],
        result: [
          "The system can read athlete push-off force on the start block using load-cell sensors.",
          "Pressure data can be displayed in real time on the TFT screen.",
          "Force-vs-time graphs help coaches analyze push patterns during the start.",
          "Force and peak-force values can be used as indicators of the athlete's explosive start performance.",
          "The device remains portable because it uses a rechargeable battery.",
          "The prototype can become a foundation for a more objective, practical, and data-driven swimming start analysis tool.",
        ],
      },
      "streamline-belt-pro": {
        title: "Streamline Belt Pro",
        category: "IoT / Wearable Sports Performance",
        summary: "A wearable swimmer belt that tracks body angle during streamline posture in real time with an IMU, provides vibration and buzzer feedback, and shows movement efficiency scores on a web dashboard.",
        problem: "Streamline posture is still often assessed visually, so body tilt, posture stability, and movement deviation are difficult to measure objectively throughout a training session.",
        solution: "I built a wearable IoT belt that reads pitch and roll using an IMU. The device provides immediate feedback when posture drifts, while a web dashboard shows score, graphs, and training history.",
        built: [
          "Designed a belt-shaped wearable device that can be attached around the swimmer's waist.",
          "Used an ESP32-C3 as the main microcontroller to read sensors and send data to the dashboard.",
          "Integrated an MPU9250 as the accelerometer and gyroscope to read body pitch and roll angles.",
          "Added two coin vibration motors as haptic feedback on the left and right sides.",
          "Used 2N2222 transistors as vibration motor drivers to strengthen the output current.",
          "Added a buzzer as a sound indicator and system feedback.",
          "Built a portable power system using a 3.7V LiPo battery and a TP4056 charger module.",
          "Added a push button for ON-OFF control.",
          "Built a web dashboard to display streamline score, pitch, roll, real-time waveform, posture tilt visualization, timer, and training-session history.",
          "Added training modes such as Freestyle, Breaststroke, Backstroke, Butterfly, and Glide Test.",
          "Built training-session controls for start, pause, stop, session recap, and CSV export.",
        ],
        result: [
          "The system can read swimmer body tilt in real time through pitch and roll angles.",
          "The dashboard can display streamline efficiency scores on a 0 to 100 scale.",
          "Vibration and buzzer feedback help athletes notice when posture begins to drift.",
          "Coaches can monitor counts of optimal posture and posture violations during each session.",
          "Training data can be recapped as session history and exported as CSV files.",
          "The prototype can become a foundation for a more objective, practical, and data-driven wearable swimming technique evaluation tool.",
        ],
      },
      "smart-takraw-trainer-machine": {
        title: "Smart Takraw Trainer Machine",
        category: "IoT / Sports Training Machine",
        summary: "An automatic sepak takraw ball launcher prototype that supports adjustable distance, angle, RPM, ball count, launch interval, and multiple training modes through a TFT-based interface.",
        problem: "Takraw practice often depends on a partner or coach throwing balls manually, making training intensity, ball speed, launch angle, and repetition difficult to keep consistent.",
        solution: "I developed an ESP32-based ball launcher with dual-wheel propulsion, servo angle control, distance sensing, and a TFT interface for switching between manual, auto, random, and adaptive training modes.",
        built: [
          "Designed an automatic ball-launching system using a dual-wheel launcher powered by RS775 DC motors.",
          "Used a BTS7960 motor driver to control launcher motor speed.",
          "Added an LM393 RPM sensor to read motor rotation speed.",
          "Used an MG996R servo to adjust the ball launch elevation angle.",
          "Used a TF Mini S LiDAR sensor to read player distance in real time.",
          "Added two A02YYUW ultrasonic sensors to detect player position on the left and right side.",
          "Built a hopper and ball-feeding channel to store and guide takraw balls into the launcher.",
          "Used an ILI9488 TFT LCD as the control and monitoring interface.",
          "Built training controls for target distance, angle, RPM, ball count, and launch interval.",
          "Added Manual, Auto, Random, and Adaptive training modes.",
          "Added a buzzer as an indicator for session start, completion, error, and system warnings.",
        ],
        result: [
          "The machine can launch takraw balls automatically and consistently.",
          "Ball speed can be controlled through motor RPM settings.",
          "Launch angle can be adjusted automatically using the servo.",
          "The system can read player distance and position using the LiDAR and ultrasonic sensor combination.",
          "The TFT interface shows training data such as distance, RPM, angle, ball count, hits, misses, accuracy, and system status.",
          "Adaptive mode allows the system to adjust training behavior based on player performance.",
          "The prototype can become a foundation for a more modern, independent, and data-driven sepak takraw training machine.",
        ],
      },
      "turbidity-sensor-kekeruhan-larutan-timer": {
        title: "Turbidity Sensor and Solution Clarity Timer",
        category: "Embedded System / Laboratory Instrumentation",
        summary: "A microcontroller-based turbidity meter prototype that reads turbidity values, estimates solution clarity percentage, classifies the condition, and shows both measurement data and timer on a 16x2 LCD.",
        problem: "Manual solution turbidity checks make it difficult to get fast, stable, and easy-to-monitor readings. Observation sessions also often require simple timing support to analyze changes over time.",
        solution: "I built a compact turbidity meter that reads an analog turbidity sensor, smooths the signal, converts it into clarity percentage, classifies the liquid condition, and supports timer and hold functions for measurement sessions.",
        built: [
          "Designed a turbidity-sensor reading system using the microcontroller's analog input.",
          "Used a 16x2 I2C LCD to display solution status, ADC value, percentage, and timer.",
          "Added a Start/Stop button to run and stop the measurement timer.",
          "Added a Hold button to freeze the sensor value and timer temporarily.",
          "Built solution-status classification logic for CLEAN, MEDIUM, and TURBID conditions.",
          "Used a Simple Moving Average method to make sensor readings more stable.",
          "Added threshold calibration based on clear-water and cloudy-water reference conditions.",
          "Added serial-monitor output for debugging ADC values, voltage, status, and turbidity percentage.",
        ],
        result: [
          "The system can read solution turbidity in real time.",
          "The LCD can display sensor value, percentage, solution status, and measurement timer.",
          "The Start/Stop feature makes it easier to track observation duration.",
          "The Hold feature can freeze readings for note-taking and data recording.",
          "Sensor readings become more stable through smoothing logic.",
          "The prototype can be used as a foundation for a simple, portable, and easy-to-calibrate solution turbidity meter.",
        ],
      },
      "body-protector-silat-pintar-berbasis-iot": {
        title: "Smart IoT Silat Body Protector",
        category: "IoT / Web Analytics Dashboard",
        summary: "A smart body protector prototype for pencak silat training that detects punch strength across multiple body zones using piezo sensors and visualizes athlete performance through a web-based analytics dashboard.",
        problem: "Silat training still relies heavily on manual observation, so punch force, dominant hit zones, and performance progress are difficult to track objectively and in real time.",
        solution: "I designed a sensor-equipped body protector with multiple piezo zones connected to an IoT pipeline. Impact data is then processed and displayed through a web dashboard for athlete comparison and training analysis.",
        built: [
          "Designed the body protector layout with sensor points on the left chest, right chest, center chest, and abdomen.",
          "Integrated piezoelectric vibration sensors to detect impact or punches.",
          "Used an ESP32 C3 Super Mini as the microcontroller for receiving and sending sensor data.",
          "Added a power system using a Li-Po battery, TP4056 charger module, and ON-OFF switch.",
          "Built a React and Vite analytics dashboard to display training data.",
          "Displayed two-athlete performance comparisons based on total punches, strongest punch, average impact, and dominant hit zone.",
          "Built torso visualization, performance charts, session tables, and match recaps.",
        ],
        result: [
          "The system can read punch impact across multiple body-protector zones.",
          "The dashboard can display training data in a way that is informative and easy for coaches to understand.",
          "Coaches can compare athlete performance based on punch strength and hit-zone distribution.",
          "Training sessions can be recapped through tables, charts, and match history.",
          "The prototype can become a foundation for a more objective, modern, and data-driven pencak silat training tool.",
        ],
      },
    },
  };

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const createEl = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    if (typeof text === "string") {
      el.textContent = text;
    }
    return el;
  };

  const setText = (selector, text, scope = document) => {
    const el = qs(selector, scope);
    if (el) {
      el.textContent = text;
    }
  };

  const setOptionalText = (selector, text, scope = document) => {
    const el = qs(selector, scope);
    if (el) {
      const value = typeof text === "string" ? text.trim() : text;
      el.textContent = value || "";
      el.hidden = !value;
    }
  };

  const setHidden = (selector, hidden, scope = document) => {
    const el = qs(selector, scope);
    if (el) {
      el.hidden = hidden;
    }
  };

  const setExternalAttrs = (anchor) => {
    if (anchor.href.startsWith("http")) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }
  };

  const syncOverlayState = () => {
    const hasOpenDialog = qsa("dialog").some((dialog) => dialog.open);
    document.body.classList.toggle("overlay-open", hasOpenDialog);
  };

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  let currentLanguage = data.settings.languages.includes(storedLanguage)
    ? storedLanguage
    : data.settings.defaultLanguage;
  let activeGroup = ALL_GROUP;
  let revealObserver;
  let showProjectDialog = () => {};
  let heroSceneInitialized = false;

  const localizeProject = (project) => {
    if (!project || currentLanguage === "id") {
      return project;
    }

    const locale = projectLocale[currentLanguage]?.[project.slug];
    if (!locale) {
      return project;
    }

    return {
      ...project,
      title: locale.title ?? project.title,
      category: locale.category ?? project.category,
      summary: locale.summary ?? project.summary,
      problem: locale.problem ?? project.problem,
      solution: locale.solution ?? project.solution,
      built: locale.built ?? project.built,
      result: locale.result ?? project.result,
      role: locale.role ?? project.role,
    };
  };

  const formatPhotoCount = (count, activeIndex = null) => {
    const safeCount = Number.isFinite(count) ? count : 0;
    const label = currentLanguage === "en"
      ? safeCount === 1 ? "photo" : "photos"
      : "foto";

    if (typeof activeIndex === "number") {
      return `${activeIndex} / ${safeCount} ${label}`;
    }

    return `${safeCount} ${label}`;
  };

  const t = (value, language = currentLanguage) => {
    if (value == null) {
      return "";
    }

    if (typeof value === "string") {
      return value;
    }

    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "object") {
      return value[language] ?? value.id ?? value.en ?? Object.values(value)[0] ?? "";
    }

    return String(value);
  };

  const tArray = (value, language = currentLanguage) => {
    const resolved = t(value, language);
    return Array.isArray(resolved) ? resolved : [];
  };

  function renderShell() {
    document.documentElement.lang = currentLanguage;
    document.title = t(data.site.title);

    const description = qs('meta[name="description"]');
    if (description) {
      description.setAttribute("content", t(data.site.description));
    }

    setText("[data-brand-name]", data.site.brand);

    ["home", "projects", "skills", "contact"].forEach((key) => {
      setText(`[data-nav-link="${key}"]`, t(data.site.nav[key]));
    });

    ["projects", "contact"].forEach((key) => {
      setText(`[data-hero-action="${key}"]`, t(data.site.heroActions[key]));
    });

    setOptionalText("[data-hero-panel-eyebrow]", t(data.site.heroPanel.eyebrow));
    setText("[data-hero-panel-title]", t(data.site.heroPanel.title));
    setText("[data-hero-panel-copy]", t(data.site.heroPanel.copy));
    setOptionalText("[data-section-projects-eyebrow]", t(data.site.sections.projects.eyebrow));
    setText("[data-section-projects-title]", t(data.site.sections.projects.title));
    setText("[data-section-projects-copy]", t(data.site.sections.projects.copy));
    setText("[data-project-scroll-hint]", t(data.site.project.scrollHint));
    setText("[data-section-skills-eyebrow]", t(data.site.sections.skills.eyebrow));
    setText("[data-section-skills-title]", t(data.site.sections.skills.title));
    setText("[data-section-process-eyebrow]", t(data.site.sections.process.eyebrow));
    setText("[data-section-process-title]", t(data.site.sections.process.title));
    setText("[data-section-contact-eyebrow]", t(data.site.sections.contact.eyebrow));
    setText("[data-section-contact-title]", t(data.site.sections.contact.title));

    setText("[data-project-dialog-gallery-label]", t(data.site.project.galleryLabel));
    setText("[data-project-dialog-label]", t(data.site.project.caseStudyLabel));
    setText('[data-project-dialog-heading="problem"]', t(data.site.project.problem));
    setText('[data-project-dialog-heading="solution"]', t(data.site.project.solution));
    setText('[data-project-dialog-heading="built"]', t(data.site.project.built));
    setText('[data-project-dialog-heading="result"]', t(data.site.project.result));

    const closeButton = qs("[data-project-dialog-close]");
    const prevButton = qs("[data-gallery-prev]");
    const nextButton = qs("[data-gallery-next]");
    const expandButton = qs("[data-gallery-expand]");

    if (closeButton) {
      closeButton.setAttribute("aria-label", t(data.site.project.close));
    }

    if (prevButton) {
      prevButton.setAttribute("aria-label", t(data.site.project.prev));
    }

    if (nextButton) {
      nextButton.setAttribute("aria-label", t(data.site.project.next));
    }

    if (expandButton) {
      expandButton.setAttribute("aria-label", t(data.site.project.expand));
      expandButton.title = t(data.site.project.expand);
    }

    setText("[data-footer-motto]", t(data.site.footerMotto));
    setText("[data-footer-name]", t(data.site.footerName) || `Copyright ${new Date().getFullYear()}`);
    setText("[data-footer-note]", t(data.site.footerNote));

    qsa("[data-language-button]").forEach((button) => {
      const isActive = button.dataset.languageButton === currentLanguage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function renderProfile() {
    setText("[data-profile-status]", t(data.profile.status));
    setText("[data-profile-role]", t(data.profile.role));
    setText("[data-profile-tagline]", t(data.profile.tagline));
    setText("[data-profile-meta]", t(data.profile.meta));
    setText("[data-contact-copy]", t(data.contact.copy));

    const photo = qs("[data-profile-photo]");
    if (photo) {
      photo.src = data.profile.photo;
      photo.alt = `${data.profile.name} portrait`;
    }

    const logo = qs("[data-profile-logo]");
    if (logo) {
      logo.src = data.profile.logo;
      logo.alt = "Rakit IoT logo";
    }

    const highlights = qs("[data-hero-highlights]");
    if (highlights) {
      highlights.replaceChildren(
        ...tArray(data.site.heroPanel.highlights).map((item) => createEl("li", "", item)),
      );
    }

    const tags = qs("[data-profile-tags]");
    if (tags) {
      tags.replaceChildren(...data.profile.tags.map((tag) => createEl("span", "chip", tag)));
    }

    const actions = qs("[data-contact-actions]");
    const actionItems = [
      { key: "email", href: data.profile.email, style: "button button-primary" },
      { key: "whatsapp", href: data.profile.whatsapp, style: "button button-secondary" },
      { key: "github", href: data.profile.github, style: "button button-secondary" },
      { key: "linkedin", href: data.profile.linkedin, style: "button button-secondary" },
      { key: "instagram", href: data.profile.instagram, style: "button button-secondary" },
    ];

    actions.replaceChildren(
      ...actionItems.map((item) => {
        const anchor = createEl("a", item.style, t(data.site.contactButtons[item.key]));
        anchor.href = item.href;
        setExternalAttrs(anchor);
        return anchor;
      }),
    );
  }

  function renderProjects() {
    const filtersEl = qs("[data-project-filters]");
    const rail = qs("[data-projects]");
    const groups = [ALL_GROUP, ...new Set(data.projects.map((project) => project.group))];

    const drawFilters = () => {
      filtersEl.replaceChildren(
        ...groups.map((group) => {
          const label = group === ALL_GROUP ? t(data.site.filters.all) : group;
          const button = createEl("button", "filter-button", label);
          button.type = "button";
          button.classList.toggle("is-active", group === activeGroup);
          button.setAttribute("aria-pressed", String(group === activeGroup));
          button.addEventListener("click", () => {
            activeGroup = group;
            drawFilters();
            drawCards();
          });
          return button;
        }),
      );
    };

    const drawCards = () => {
      const visibleProjects =
        activeGroup === ALL_GROUP
          ? data.projects
          : data.projects.filter((project) => project.group === activeGroup);
      const orderedProjects = [...visibleProjects].sort((left, right) => {
        const leftIsAlga = left.slug === "alga-sistem-indoor-untuk-pertumbuhan-alga";
        const rightIsAlga = right.slug === "alga-sistem-indoor-untuk-pertumbuhan-alga";

        if (leftIsAlga === rightIsAlga) {
          return 0;
        }

        return leftIsAlga ? 1 : -1;
      });

      rail.replaceChildren(
        ...orderedProjects.map((project) => {
          const localizedProject = localizeProject(project);
          const card = createEl("button", "project-card reveal");
          card.type = "button";
          card.setAttribute("aria-haspopup", "dialog");
          card.setAttribute("aria-label", `${t(data.site.project.cta)}: ${localizedProject.title}`);
          card.addEventListener("click", () => {
            showProjectDialog(localizedProject, card);
          });

          const media = createEl("div", "project-media");
          const image = createEl("img");
          image.src = localizedProject.image;
          image.alt = `${localizedProject.title} preview`;
          image.loading = "lazy";
          media.append(image);

          const body = createEl("div", "project-body");
          const category = createEl("p", "project-category-line", localizedProject.category);
          const title = createEl("h3", "", localizedProject.title);
          const meta = createEl("div", "project-card-footer");
          meta.append(
            createEl("span", "project-photo-count", formatPhotoCount(localizedProject.gallery.length)),
            createEl("span", "project-open-link", t(data.site.project.cta)),
          );

          body.append(category, title, meta);
          card.append(media, body);
          return card;
        }),
      );

      observeReveals();
    };

    drawFilters();
    drawCards();
  }

  function renderSkills() {
    const skills = qs("[data-skills]");
    const legacySkills = qs("[data-skills-legacy]");

    if (!skills) {
      return;
    }

    const createSkillItemNode = (item) => {
      const row = createEl("li", "skill-item");
      const iconWrap = createEl("span", "skill-item-mark");
      const tool = skillVisuals.get(item) || orbitCoreToolMap.get(item) || orbitToolMap.get(item);

      if (Array.isArray(tool?.images) && tool.images.length > 0) {
        iconWrap.classList.add("skill-item-mark-stack");
        tool.images.slice(0, 3).forEach((src) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = `${item} logo`;
          img.className = "skill-item-mini";
          iconWrap.append(img);
        });
      } else if (tool?.image) {
        const img = document.createElement("img");
        img.src = tool.image;
        img.alt = `${item} logo`;
        iconWrap.append(img);
      } else {
        iconWrap.append(createEl("span", "skill-item-fallback", tool?.shortLabel || item.slice(0, 3).toUpperCase()));
      }

      row.append(iconWrap, createEl("span", "skill-item-label", t(item)));
      return row;
    };

    skills.replaceChildren(
      ...data.skills.map((cluster) => {
        const article = createEl("article", "skill-card reveal");
        const head = createEl("div", "skill-card-head");
        const countLabel = currentLanguage === "id" ? `${cluster.items.length} item` : `${cluster.items.length} items`;
        const count = createEl("span", "skill-card-count", countLabel);
        const list = createEl("ul");
        list.replaceChildren(
          ...cluster.items.map((item) => createSkillItemNode(item)),
        );
        head.append(createEl("h3", "", t(cluster.title)), count);
        article.append(head, list);
        return article;
      }),
    );

    if (!legacySkills) {
      return;
    }

    legacySkills.replaceChildren(
      ...data.skillsLegacy.map((cluster) => {
        const article = createEl("article", "skill-card skill-card-legacy reveal");
        const head = createEl("div", "skill-card-head");
        const countLabel = currentLanguage === "id" ? `${cluster.items.length} item` : `${cluster.items.length} items`;
        const count = createEl("span", "skill-card-count", countLabel);
        const list = createEl("ul");
        list.replaceChildren(...cluster.items.map((item) => createSkillItemNode(item)));
        head.append(createEl("h3", "", t(cluster.title)), count);
        article.append(head, list);
        return article;
      }),
    );
  }

  function renderProcess() {
    const process = qs("[data-process]");
    if (!process) {
      return;
    }

    process.replaceChildren(
      ...data.process.map((step) => {
        const article = createEl("article", "process-step reveal");
        article.append(createEl("h3", "", t(step.title)), createEl("p", "", t(step.text)));
        return article;
      }),
    );
  }

  function resolveGallery(project) {
    const gallery = Array.isArray(project.gallery) && project.gallery.length > 0 ? project.gallery : [project.image];
    return gallery.map((item, index) => {
      if (typeof item === "string") {
        return { src: item, alt: `${project.title} - ${index + 1}` };
      }

      return {
        src: item.src,
        alt: item.alt || `${project.title} - ${index + 1}`,
      };
    });
  }

  function initProjectDialog() {
    const dialog = qs("[data-project-dialog]");
    const closeButton = qs("[data-project-dialog-close]", dialog);
    const facts = qs("[data-project-dialog-facts]", dialog);
    const stack = qs("[data-project-dialog-stack]", dialog);
    const links = qs("[data-project-dialog-links]", dialog);
    const galleryTrack = qs("[data-project-gallery-track]", dialog);
    const galleryThumbs = qs("[data-project-gallery-thumbs]", dialog);
    const galleryCount = qs("[data-project-gallery-count]", dialog);
    const prevButton = qs("[data-gallery-prev]", dialog);
    const nextButton = qs("[data-gallery-next]", dialog);
    const expandButton = qs("[data-gallery-expand]", dialog);

    let returnFocusTo = null;
    let slides = [];
    let activeIndex = 0;
    let galleryCleanup = () => {};

    const setSectionText = (name, text) => {
      setText(`[data-project-dialog-${name}]`, text || "", dialog);
      setHidden(`[data-project-dialog-section="${name}"]`, !text, dialog);
    };

    const setSectionList = (name, items) => {
      const list = qs(`[data-project-dialog-${name}]`, dialog);
      const values = Array.isArray(items) ? items : [];
      list.replaceChildren(...values.map((item) => createEl("li", "", t(item))));
      setHidden(`[data-project-dialog-section="${name}"]`, values.length === 0, dialog);
    };

    const syncGalleryState = () => {
      const total = slides.length;
      galleryCount.textContent = total
        ? formatPhotoCount(total, activeIndex + 1)
        : formatPhotoCount(0, 0);

      qsa("[data-gallery-thumb]", galleryThumbs).forEach((button, index) => {
        const isActive = index === activeIndex;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      prevButton.disabled = activeIndex <= 0;
      nextButton.disabled = activeIndex >= total - 1;
    };

    const getClosestSlideIndex = () => {
      if (!slides.length) {
        return 0;
      }

      return slides.reduce((closest, slide, index) => {
        const currentDistance = Math.abs(galleryTrack.scrollLeft - slide.offsetLeft);
        const bestDistance = Math.abs(galleryTrack.scrollLeft - slides[closest].offsetLeft);
        return currentDistance < bestDistance ? index : closest;
      }, 0);
    };

    const goToSlide = (index, behavior = "smooth") => {
      if (!slides[index]) {
        return;
      }

      activeIndex = index;
      slides[index].scrollIntoView({ behavior, inline: "start", block: "nearest" });
      syncGalleryState();
    };

    const expandCurrentSlide = () => {
      const currentSlide = slides[activeIndex];
      const currentImage = qs("img", currentSlide);

      if (!currentImage) {
        return;
      }

      if (currentSlide.requestFullscreen) {
        currentSlide.requestFullscreen().catch(() => {
          window.open(currentImage.src, "_blank", "noopener");
        });
        return;
      }

      window.open(currentImage.src, "_blank", "noopener");
    };

    const renderGallery = (project) => {
      galleryCleanup();

      const galleryItems = resolveGallery(project);
      galleryTrack.replaceChildren(
        ...galleryItems.map((item) => {
          const figure = createEl("figure", "project-gallery-slide");
          figure.setAttribute("data-gallery-slide", "");

          const image = createEl("img");
          image.src = item.src;
          image.alt = item.alt;
          image.loading = "lazy";

          figure.append(image);
          return figure;
        }),
      );

      galleryThumbs.replaceChildren(
        ...galleryItems.map((item, index) => {
          const thumbButton = createEl("button", "gallery-thumb");
          thumbButton.type = "button";
          thumbButton.setAttribute("data-gallery-thumb", "");
          thumbButton.setAttribute("aria-label", `${t(data.site.project.galleryLabel)} ${index + 1}`);
          thumbButton.addEventListener("click", () => goToSlide(index));

          const thumbImage = createEl("img");
          thumbImage.src = item.src;
          thumbImage.alt = item.alt;
          thumbImage.loading = "lazy";
          thumbButton.append(thumbImage);
          return thumbButton;
        }),
      );

      slides = qsa("[data-gallery-slide]", galleryTrack);
      activeIndex = 0;

      const onScroll = () => {
        const nextIndex = getClosestSlideIndex();
        if (nextIndex !== activeIndex) {
          activeIndex = nextIndex;
          syncGalleryState();
        }
      };

      const onResize = () => {
        activeIndex = getClosestSlideIndex();
        syncGalleryState();
      };

      galleryTrack.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      prevButton.onclick = () => goToSlide(Math.max(0, activeIndex - 1));
      nextButton.onclick = () => goToSlide(Math.min(slides.length - 1, activeIndex + 1));
      expandButton.onclick = expandCurrentSlide;

      galleryCleanup = () => {
        galleryTrack.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        prevButton.onclick = null;
        nextButton.onclick = null;
        expandButton.onclick = null;
      };

      requestAnimationFrame(() => {
        galleryTrack.scrollLeft = 0;
        syncGalleryState();
      });
    };

    const close = () => {
      if (dialog.open) {
        dialog.close();
      }

      syncOverlayState();

      if (returnFocusTo instanceof HTMLElement) {
        returnFocusTo.focus();
      }
    };

    showProjectDialog = (project, trigger) => {
      returnFocusTo = trigger instanceof HTMLElement ? trigger : document.activeElement;

      setText("[data-project-dialog-title]", project.title);
      setText("[data-project-dialog-summary]", t(project.summary));

      const factItems = [
        project.category,
        `${t(data.site.project.year)} ${project.year}`,
        `${t(data.site.project.role)} ${project.role}`,
      ].filter(Boolean);

      facts.replaceChildren(...factItems.map((item) => createEl("span", "project-dialog-fact", item)));
      stack.replaceChildren(...project.stack.map((item) => createEl("span", "", item)));
      setSectionText("problem", t(project.problem));
      setSectionText("solution", t(project.solution));
      setSectionList("built", project.built);
      setSectionList("result", project.result);

      links.replaceChildren(
        ...project.links.map((link, index) => {
          const anchor = createEl(
            "a",
            index === 0 ? "button button-primary" : "button button-secondary",
            t(link.label),
          );
          anchor.href = link.href;
          setExternalAttrs(anchor);
          return anchor;
        }),
      );
      links.hidden = project.links.length === 0;

      renderGallery(project);

      if (!dialog.open) {
        dialog.showModal();
      }

      syncOverlayState();
      requestAnimationFrame(() => closeButton.focus());
    };

    closeButton.addEventListener("click", close);
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      close();
    });
    dialog.addEventListener("close", syncOverlayState);
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const clickedOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (clickedOutside) {
        close();
      }
    });
  }

  function observeReveals() {
    const revealItems = qsa(".reveal:not([data-reveal-bound])");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );
    }

    revealItems.forEach((item) => {
      item.dataset.revealBound = "true";
      revealObserver.observe(item);
    });
  }

  function initHeader() {
    const header = qs("[data-header]");
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initLanguageSwitch() {
    qsa("[data-language-button]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextLanguage = button.dataset.languageButton;
        if (!data.settings.languages.includes(nextLanguage) || nextLanguage === currentLanguage) {
          return;
        }

        currentLanguage = nextLanguage;
        window.localStorage.setItem(STORAGE_KEY, currentLanguage);
        renderAll();
      });
    });
  }

  function createTextTexture(label, sublabel, color) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;

    const ctx = canvas.getContext("2d");
    const accent = color || "#2f56ff";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#07100e";
    roundedRect(ctx, 0, 0, 512, 320, 42);
    ctx.fill();

    ctx.fillStyle = "#0f1917";
    roundedRect(ctx, 18, 18, 476, 284, 30);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.16;
    ctx.beginPath();
    ctx.arc(118, 112, 64, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(118, 112, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#d6e1ff";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(82, 198);
    ctx.lineTo(156, 198);
    ctx.lineTo(156, 144);
    ctx.lineTo(226, 144);
    ctx.stroke();

    ctx.fillStyle = "#f3f7f4";
    ctx.textBaseline = "middle";
    drawFittedText(ctx, label, 250, 136, 220, 42, "#f3f7f4");
    drawFittedText(ctx, sublabel || "Tool", 250, 188, 220, 28, accent);

    return canvas;
  }

  function createMiniLogoTexture(label, shortLabel, color) {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext("2d");
    const accent = color || "#2f56ff";
    const badge = shortLabel || label;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = `${accent}22`;
    ctx.beginPath();
    ctx.arc(128, 128, 96, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#091210";
    ctx.beginPath();
    ctx.arc(128, 128, 84, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `${accent}cc`;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(128, 128, 84, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = `${accent}24`;
    ctx.beginPath();
    ctx.arc(128, 96, 42, 0, Math.PI * 2);
    ctx.fill();

    drawCenteredFittedText(ctx, badge, 128, 116, 136, 68, "#f3f7f4", 22, 800);
    drawCenteredFittedText(ctx, label, 128, 174, 164, 24, accent, 12, 700);

    return canvas;
  }

  function roundedRect(ctx, x, y, width, height, radius) {
    const safeRadius = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + safeRadius, y);
    ctx.lineTo(x + width - safeRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
    ctx.lineTo(x + width, y + height - safeRadius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
    ctx.lineTo(x + safeRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
    ctx.lineTo(x, y + safeRadius);
    ctx.quadraticCurveTo(x, y, x + safeRadius, y);
    ctx.closePath();
  }

  function drawFittedText(ctx, text, x, y, maxWidth, initialSize, color) {
    let size = initialSize;
    ctx.fillStyle = color;
    ctx.font = `800 ${size}px Inter, Arial, sans-serif`;

    while (ctx.measureText(text).width > maxWidth && size > 18) {
      size -= 2;
      ctx.font = `800 ${size}px Inter, Arial, sans-serif`;
    }

    ctx.fillText(text, x, y);
  }

  function drawCenteredFittedText(ctx, text, x, y, maxWidth, initialSize, color, minSize = 18, fontWeight = 800) {
    let size = initialSize;
    ctx.fillStyle = color;
    ctx.font = `${fontWeight} ${size}px Inter, Arial, sans-serif`;

    while (ctx.measureText(text).width > maxWidth && size > minSize) {
      size -= 2;
      ctx.font = `${fontWeight} ${size}px Inter, Arial, sans-serif`;
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
    ctx.textAlign = "start";
  }

  function makeRingPoints(axis, radius) {
    const points = [];
    const segments = 96;

    for (let i = 0; i < segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (axis === "xy") {
        points.push(new window.THREE.Vector3(x, y, 0));
      } else if (axis === "xz") {
        points.push(new window.THREE.Vector3(x, 0, y));
      } else {
        points.push(new window.THREE.Vector3(0, x, y));
      }
    }

    return points;
  }

  function fibonacciPoint(index, total, radius) {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const y = 1 - (index / Math.max(1, total - 1)) * 2;
    const circleRadius = Math.sqrt(1 - y * y);
    const theta = index * goldenAngle;

    return new window.THREE.Vector3(
      Math.cos(theta) * circleRadius * radius,
      y * radius,
      Math.sin(theta) * circleRadius * radius,
    );
  }

  function fibonacciCompressedPoint(index, total, radius, depthScale = 1, frontBias = 0) {
    const point = fibonacciPoint(index, total, radius);
    point.z = point.z * depthScale + frontBias;
    return point;
  }

  function setTextureEncoding(texture) {
    if (!texture) {
      return;
    }

    if ("colorSpace" in texture && window.THREE.SRGBColorSpace) {
      texture.colorSpace = window.THREE.SRGBColorSpace;
      return;
    }

    if ("encoding" in texture && window.THREE.sRGBEncoding) {
      texture.encoding = window.THREE.sRGBEncoding;
    }
  }

  function initThreeScenes() {
    if (heroSceneInitialized) {
      return;
    }

    const canvas = qs("#core-canvas");
    const hero = qs(".hero");

    if (!canvas || !hero) {
      return;
    }

    let attempts = 0;

    const run = () => {
      if (window.THREE) {
        heroSceneInitialized = true;
        initHeroOrbit(canvas, hero);
        return;
      }

      attempts += 1;
      if (attempts < 120) {
        requestAnimationFrame(run);
      }
    };

    run();
  }

  function initHeroOrbit(canvas, hero) {
    const THREE = window.THREE;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionFactor = prefersReducedMotion ? 0.2 : 1;

    const getViewportConfig = (width) => {
      // Mobile tuning lives here: shift with orbitX/lookAtX and resize with orbitScale.
      if (width < 760) {
        return {
          orbitX: -0.60,
          orbitY: 0.40,
          orbitScale: 0.50,
          lookAtX: -0.14,
          cameraX: 0.08,
          parallax: 2.92,
        };
      }

      if (width < 1080) {
        return {
          orbitX: -2.38,
          orbitY: 0.08,
          orbitScale: 0.74,
          lookAtX: -1.48,
          cameraX: 0.18,
          parallax: 0.62,
        };
      }

      return {
        orbitX: -5.95,
        orbitY: 0.08,
        orbitScale: 0.84,
        lookAtX: -2.56,
        cameraX: 0.26,
        parallax: 1,
      };
    };

    const setHeroMotionVars = (values) => {
      hero.style.setProperty("--hero-backdrop-x", `${values.backdropX.toFixed(2)}px`);
      hero.style.setProperty("--hero-backdrop-y", `${values.backdropY.toFixed(2)}px`);
      hero.style.setProperty("--hero-copy-x", `${values.copyX.toFixed(2)}px`);
      hero.style.setProperty("--hero-copy-y", `${values.copyY.toFixed(2)}px`);
      hero.style.setProperty("--hero-copy-rx", `${values.copyRotateX.toFixed(2)}deg`);
      hero.style.setProperty("--hero-copy-ry", `${values.copyRotateY.toFixed(2)}deg`);
      hero.style.setProperty("--hero-photo-x", `${values.photoX.toFixed(2)}px`);
      hero.style.setProperty("--hero-photo-y", `${values.photoY.toFixed(2)}px`);
      hero.style.setProperty("--hero-photo-rx", `${values.photoRotateX.toFixed(2)}deg`);
      hero.style.setProperty("--hero-photo-ry", `${values.photoRotateY.toFixed(2)}deg`);
      hero.style.setProperty("--hero-photo-scale", values.photoScale.toFixed(4));
    };

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    if ("outputEncoding" in renderer && THREE.sRGBEncoding) {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0.22, 0.16, 6.35);

    const initialViewport = getViewportConfig(window.innerWidth);
    const orbitGroup = new THREE.Group();
    orbitGroup.position.set(initialViewport.orbitX, initialViewport.orbitY, 0);
    scene.add(orbitGroup);

    const spinGroup = new THREE.Group();
    orbitGroup.add(spinGroup);

    scene.add(new THREE.AmbientLight(0xd6e1ff, 0.9));

    const keyLight = new THREE.PointLight(0x2f56ff, 1.35, 10);
    keyLight.position.set(2.8, 2.4, 4.5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x7aa2ff, 0.42, 9);
    fillLight.position.set(-2.3, -1.4, 3.1);
    scene.add(fillLight);

    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 36, 20),
      new THREE.MeshBasicMaterial({
        color: 0x2f56ff,
        transparent: true,
        opacity: 0.08,
        wireframe: true,
      }),
    );
    spinGroup.add(shell);

    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xb6c7ff,
      transparent: true,
      opacity: 0.2,
    });

    const rings = [
      new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(makeRingPoints("xy", 2.08)), ringMaterial),
      new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(makeRingPoints("xz", 2.08)), ringMaterial),
      new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(makeRingPoints("yz", 2.08)), ringMaterial),
    ];
    rings.forEach((ring) => spinGroup.add(ring));

    const outerLayer = new THREE.Group();
    const innerLayer = new THREE.Group();
    spinGroup.add(outerLayer);
    spinGroup.add(innerLayer);

    const hasDenseOrbit = orbitTools.length > 10;
    const spriteDepthScale = hasDenseOrbit ? 0.58 : 0.68;
    const spriteFrontBias = hasDenseOrbit ? 0.18 : 0.14;
    const spriteBaseScale = hasDenseOrbit ? 0.6 : 0.7;
    const coreDepthScale = 0.82;
    const coreFrontBias = 0.02;
    const coreBaseScale = 0.24;

    const loader = new THREE.TextureLoader();
    const sprites = orbitTools.map((tool, index) => {
      const fallbackTexture = new THREE.CanvasTexture(createTextTexture(tool.name, tool.category, tool.color));
      setTextureEncoding(fallbackTexture);

      const material = new THREE.SpriteMaterial({
        map: fallbackTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.copy(
        fibonacciCompressedPoint(index, orbitTools.length, 2.28, spriteDepthScale, spriteFrontBias),
      );
      sprite.scale.set(spriteBaseScale, spriteBaseScale * 0.64, 1);
      sprite.userData.baseScale = spriteBaseScale;
      outerLayer.add(sprite);

      loader.load(
        tool.image,
        (texture) => {
          setTextureEncoding(texture);
          material.map = texture;
          material.needsUpdate = true;
        },
        undefined,
        () => {
          material.map = fallbackTexture;
          material.needsUpdate = true;
        },
      );

      return sprite;
    });

    const coreSprites = orbitCoreTools.map((tool, index) => {
      const fallbackTexture = new THREE.CanvasTexture(createMiniLogoTexture(tool.name, tool.shortLabel, tool.color));
      setTextureEncoding(fallbackTexture);

      const material = new THREE.SpriteMaterial({
        map: fallbackTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.94,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.copy(
        fibonacciCompressedPoint(index, orbitCoreTools.length, 1.18, coreDepthScale, coreFrontBias),
      );
      sprite.scale.set(coreBaseScale, coreBaseScale, 1);
      sprite.userData.baseScale = coreBaseScale;
      innerLayer.add(sprite);

      if (tool.image) {
        loader.load(
          tool.image,
          (texture) => {
            setTextureEncoding(texture);
            material.map = texture;
            material.needsUpdate = true;
          },
          undefined,
          () => {
            material.map = fallbackTexture;
            material.needsUpdate = true;
          },
        );
      }

      return sprite;
    });

    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };
    const scrollState = { current: 0, target: 0 };
    const worldPosition = new THREE.Vector3();
    const clock = new THREE.Clock();

    const updatePointer = (event) => {
      const rect = hero.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const nextX = (event.clientX - rect.left) / width - 0.5;
      const nextY = (event.clientY - rect.top) / height - 0.5;

      pointerTarget.x = Math.max(-0.5, Math.min(0.5, nextX));
      pointerTarget.y = Math.max(-0.5, Math.min(0.5, nextY));
    };

    const resetPointer = () => {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };

    hero.addEventListener("pointermove", updatePointer, { passive: true });
    hero.addEventListener("pointerleave", resetPointer, { passive: true });
    hero.addEventListener("pointercancel", resetPointer, { passive: true });
    window.addEventListener("blur", resetPointer, { passive: true });

    const updateScrollSpin = () => {
      const viewportHeight = Math.max(window.innerHeight, 1);
      scrollState.target = (window.scrollY / viewportHeight) * 0.95;
    };

    window.addEventListener("scroll", updateScrollSpin, { passive: true });

    const resize = () => {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 720 ? 1.35 : 1.8));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resize);
    resize();
    updateScrollSpin();
    setHeroMotionVars({
      backdropX: 0,
      backdropY: 0,
      copyX: 0,
      copyY: 0,
      copyRotateX: 0,
      copyRotateY: 0,
      photoX: 0,
      photoY: 0,
      photoRotateX: 0,
      photoRotateY: 0,
      photoScale: 1,
    });

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const viewport = getViewportConfig(window.innerWidth);
      const pointerEase = window.innerWidth < 760 ? 0.08 : 0.065;

      pointer.x += (pointerTarget.x - pointer.x) * pointerEase;
      pointer.y += (pointerTarget.y - pointer.y) * pointerEase;
      scrollState.current += (scrollState.target - scrollState.current) * 0.08;

      const driftX = Math.sin(elapsed * 0.42) * 0.11;
      const driftY = Math.cos(elapsed * 0.36) * 0.09;
      const motionX = (pointer.x + driftX) * motionFactor;
      const motionY = (pointer.y + driftY) * motionFactor;
      const motionEnergy = Math.min(1, Math.hypot(pointer.x, pointer.y) * 2.2) * motionFactor;
      const scrollRotation = scrollState.current * motionFactor;
      const scrollVelocity = (scrollState.target - scrollState.current) * 0.6;

      const targetX = viewport.orbitX;
      const targetY = viewport.orbitY + Math.sin(elapsed * 0.42) * 0.14 * motionFactor;
      const targetScale = viewport.orbitScale;
      const targetRotationX = -0.14 - motionY * 0.2 * viewport.parallax;
      const targetRotationY = motionX * 0.24 * viewport.parallax;
      const targetRotationZ = (motionX * 0.06 + motionY * 0.04) * viewport.parallax;

      const layerFactor = viewport.parallax * motionFactor;

      orbitGroup.position.x += (targetX - orbitGroup.position.x) * 0.05;
      orbitGroup.position.y += (targetY - orbitGroup.position.y) * 0.05;
      orbitGroup.scale.setScalar(targetScale);

      orbitGroup.rotation.x += (targetRotationX - orbitGroup.rotation.x) * 0.055;
      orbitGroup.rotation.y += (targetRotationY - orbitGroup.rotation.y) * 0.055;
      orbitGroup.rotation.z += (targetRotationZ - orbitGroup.rotation.z) * 0.05;

      spinGroup.rotation.x =
        -0.17 +
        Math.sin(elapsed * 0.34) * 0.055 * motionFactor +
        motionY * 0.08 +
        scrollVelocity * 0.08;
      spinGroup.rotation.y = elapsed * 0.28 * motionFactor + motionX * 0.08 + scrollRotation;
      spinGroup.rotation.z =
        Math.sin(elapsed * 0.26) * 0.04 * motionFactor - motionX * 0.035 + scrollVelocity * 0.03;
      outerLayer.rotation.y = Math.sin(elapsed * 0.22) * 0.045 * motionFactor;
      innerLayer.rotation.y = -elapsed * 0.18 * motionFactor - motionX * 0.03;
      innerLayer.rotation.x = Math.cos(elapsed * 0.28) * 0.04 * motionFactor + motionY * 0.04;
      innerLayer.rotation.z = Math.sin(elapsed * 0.24) * 0.028 * motionFactor;

      const cameraTargetX = viewport.cameraX + motionX * 0.22 * viewport.parallax;
      const cameraTargetY = 0.16 - motionY * 0.12 * viewport.parallax;
      const cameraTargetZ = 6.28 - motionEnergy * 0.14 * viewport.parallax;

      camera.position.x += (cameraTargetX - camera.position.x) * 0.055;
      camera.position.z += (cameraTargetZ - camera.position.z) * 0.055;
      camera.position.y += (cameraTargetY - camera.position.y) * 0.055;
      camera.lookAt(viewport.lookAtX + motionX * 0.32, motionY * 0.08, 0);

      sprites.forEach((sprite, index) => {
        sprite.getWorldPosition(worldPosition);
        const depth = THREE.MathUtils.clamp((worldPosition.z + 2.8) / 5.6, 0, 1);
        const scale = sprite.userData.baseScale * (0.84 + depth * 0.22);
        sprite.scale.set(scale, scale * 0.63, 1);
        sprite.material.opacity = Math.min(1, 0.58 + depth * 0.34);
        sprite.material.rotation = Math.sin(elapsed * 0.38 + index * 0.72) * 0.018;
      });

      coreSprites.forEach((sprite, index) => {
        sprite.getWorldPosition(worldPosition);
        const depth = THREE.MathUtils.clamp((worldPosition.z + 1.7) / 3.4, 0, 1);
        const scale = sprite.userData.baseScale * (0.88 + depth * 0.16);
        sprite.scale.set(scale, scale, 1);
        sprite.material.opacity = Math.min(1, 0.52 + depth * 0.4);
        sprite.material.rotation = Math.sin(elapsed * 0.44 + index * 0.54) * 0.012;
      });

      shell.material.opacity = 0.1 + Math.sin(elapsed * 0.9) * 0.018 + motionEnergy * 0.015;
      ringMaterial.opacity = 0.2 + Math.sin(elapsed * 1.05) * 0.028 + motionEnergy * 0.025;
      rings[0].rotation.z = elapsed * 0.22 * motionFactor + scrollRotation * 0.08;
      rings[1].rotation.x = elapsed * 0.16 * motionFactor + motionY * 0.12 + scrollVelocity * 0.06;
      rings[2].rotation.y = -elapsed * 0.2 * motionFactor + motionX * 0.12 + scrollRotation * 0.12;
      keyLight.position.x = 2.8 + motionX * 0.9;
      keyLight.position.y = 2.4 - motionY * 0.55;
      fillLight.position.x = -2.3 - motionX * 0.55;
      fillLight.position.y = -1.4 + motionY * 0.42;
      keyLight.intensity = 1.16 + Math.sin(elapsed * 0.8) * 0.1 + motionEnergy * 0.08;
      fillLight.intensity = 0.42 + Math.sin(elapsed * 0.6) * 0.05 + motionEnergy * 0.04;

      setHeroMotionVars({
        backdropX: motionX * 12 * layerFactor,
        backdropY: motionY * 9 * layerFactor,
        copyX: -motionX * 18 * layerFactor,
        copyY: -motionY * 13 * layerFactor,
        copyRotateX: motionY * 4.6 * layerFactor,
        copyRotateY: -motionX * 5.4 * layerFactor,
        photoX: motionX * 24 * layerFactor,
        photoY: motionY * 16 * layerFactor,
        photoRotateX: -motionY * 5.8 * layerFactor,
        photoRotateY: motionX * 7.2 * layerFactor,
        photoScale: 1.015 + motionEnergy * 0.018,
      });

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    animate();
  }

  function renderAll() {
    renderShell();
    renderProfile();
    renderProjects();
    renderSkills();
    renderProcess();
    observeReveals();
  }

  initProjectDialog();
  initHeader();
  initLanguageSwitch();
  renderAll();
  initThreeScenes();
})();
