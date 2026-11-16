"""
MindSolace - Student-Friendly Simple PowerPoint Presentation Generator
Updated with Students' Enrollment Numbers:
- Simran (Enrollment No: 2504MCACS0019)
- Jhalak Jaiswal (Enrollment No: 2504MCACS0008)
- Swati Bhadoriya (Enrollment No: 2504MCAAIML0058)
- Vinay Gehlot (Enrollment No: 2504MCAAIML0070)
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
import os

def build_student_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Warm & Calm Student Theme Colors
    C_BG = RGBColor(248, 250, 252)        # Light clean background #F8FAFC
    C_NAVY = RGBColor(15, 23, 42)          # Dark slate #0F172A
    C_BLUE = RGBColor(37, 99, 235)         # Bright clean blue #2563EB
    C_TEAL = RGBColor(13, 148, 136)        # Calming teal #0D9488
    C_PURPLE = RGBColor(124, 58, 237)      # Soft purple #7C3AED
    C_RED = RGBColor(225, 29, 72)          # Alert red #E11D48
    C_CARD_BG = RGBColor(255, 255, 255)    # White card
    C_BORDER = RGBColor(226, 232, 240)     # Light grey border
    C_TEXT = RGBColor(30, 41, 59)          # Body text #1E293B
    C_MUTED = RGBColor(100, 116, 139)      # Muted text

    def add_bg(slide, color):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, subtitle_text="MCA Minor Project Presentation"):
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11.7), Inches(0.35))
        tf_s = sub_box.text_frame
        tf_s.word_wrap = True
        p_s = tf_s.paragraphs[0]
        p_s.text = subtitle_text.upper()
        p_s.font.size = Pt(11)
        p_s.font.bold = True
        p_s.font.color.rgb = C_TEAL
        p_s.font.name = "Arial"

        t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.8))
        tf_t = t_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(24)
        p_t.font.bold = True
        p_t.font.color.rgb = C_NAVY
        p_t.font.name = "Arial"

    def add_card(slide, left, top, width, height, title, points, color=C_BLUE, emoji=""):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        card.line.width = Pt(1.5)

        tb = slide.shapes.add_textbox(left + Inches(0.3), top + Inches(0.25), width - Inches(0.6), height - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True

        p_h = tf.paragraphs[0]
        p_h.text = f"{emoji} {title}".strip()
        p_h.font.size = Pt(16)
        p_h.font.bold = True
        p_h.font.color.rgb = color
        p_h.font.name = "Arial"
        p_h.space_after = Pt(12)

        for pt in points:
            p = tf.add_paragraph()
            p.text = f"•  {pt}"
            p.font.size = Pt(12.5)
            p.font.color.rgb = C_TEXT
            p.font.name = "Arial"
            p.space_after = Pt(8)

    # -------------------------------------------------------------
    # SLIDE 1: TITLE SLIDE (With Student Names & Enrollment Nos)
    # -------------------------------------------------------------
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1, RGBColor(15, 23, 42))

    card1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(0.8), Inches(11.333), Inches(5.9))
    card1.fill.solid()
    card1.fill.fore_color.rgb = RGBColor(30, 41, 59)
    card1.line.color.rgb = C_TEAL
    card1.line.width = Pt(2)

    tb1 = s1.shapes.add_textbox(Inches(1.4), Inches(1.0), Inches(10.5), Inches(5.5))
    tf1 = tb1.text_frame
    tf1.word_wrap = True

    p = tf1.paragraphs[0]
    p.text = "MCA MINOR PROJECT (MCA 306)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_TEAL
    p.space_after = Pt(8)

    p = tf1.add_paragraph()
    p.text = "MindSolace 🌿"
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    p.space_after = Pt(4)

    p = tf1.add_paragraph()
    p.text = "A Safe Space to Share Feelings, Vent, and Find Comfort with AI & Peer Listeners"
    p.font.size = Pt(15)
    p.font.italic = True
    p.font.color.rgb = RGBColor(186, 230, 253)
    p.space_after = Pt(20)

    p = tf1.add_paragraph()
    p.text = "PROJECT TEAM MEMBERS & ENROLLMENT NUMBERS:"
    p.font.size = Pt(12.5)
    p.font.bold = True
    p.font.color.rgb = C_TEAL
    p.space_after = Pt(6)

    team_members = [
        ("Simran", "2504MCACS0019"),
        ("Jhalak Jaiswal", "2504MCACS0008"),
        ("Swati Bhadoriya", "2504MCAAIML0058"),
        ("Vinay Gehlot", "2504MCAAIML0070")
    ]
    for name, enroll in team_members:
        p = tf1.add_paragraph()
        p.text = f"•  {name}  —  Enrollment No: {enroll}"
        p.font.size = Pt(13)
        p.font.color.rgb = RGBColor(255, 255, 255)

    p = tf1.add_paragraph()
    p.text = "\nDepartment of Computer Applications  |  Master of Computer Applications (MCA)"
    p.font.size = Pt(11)
    p.font.color.rgb = C_MUTED

    # -------------------------------------------------------------
    # SLIDE 2: WHY WE MADE THIS PROJECT (OUR INSPIRATION)
    # -------------------------------------------------------------
    s2 = prs.slides.add_slide(blank_layout)
    add_bg(s2, C_BG)
    add_header(s2, "Why We Made This Project? (Our Motivation)")

    add_card(s2, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "The Reality Students Face",
             [
                 "Exam pressure, assignment deadlines, and career tension cause a lot of stress.",
                 "Many students feel lonely, isolated, or sad, especially late at night.",
                 "People hesitate to share with friends or parents because they fear being judged.",
                 "Keeping feelings bottled up inside leads to anxiety and mental breakdown."
             ], C_RED, "😔")

    add_card(s2, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "What We Wanted to Build",
             [
                 "A simple, welcoming website where anyone can vent their heart out.",
                 "When no one is available to talk, our caring AI Companion is always there.",
                 "When they want to talk to a real person, they can connect with online peers.",
                 "100% Private: No login required, no data leakage, and complete safety."
             ], C_TEAL, "💡")

    # -------------------------------------------------------------
    # SLIDE 3: PROBLEMS IN EXISTING APPS
    # -------------------------------------------------------------
    s3 = prs.slides.add_slide(blank_layout)
    add_bg(s3, C_BG)
    add_header(s3, "Problems We Found in Existing Solutions")

    add_card(s3, Inches(0.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Fear of Judgment",
             [
                 "People don't want others to think they are 'weak' or 'depressed'.",
                 "Social media makes everyone look happy, increasing real-life loneliness.",
                 "There are very few places where you can speak truly anonymously."
             ], C_PURPLE, "🤐")

    add_card(s3, Inches(4.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Expensive & Inconvenient",
             [
                 "Professional therapists charge high fees per session.",
                 "You have to book appointments days in advance.",
                 "Helplines are often busy right when someone has a sudden panic attack."
             ], C_RED, "⏳")

    add_card(s3, Inches(8.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Privacy Issues in Apps",
             [
                 "Most mental health apps ask for phone numbers, Google login, or email.",
                 "Users worry their private feelings and chats might be leaked or sold.",
                 "Students want simple, no-strings-attached emotional support."
             ], C_BLUE, "🔒")

    # -------------------------------------------------------------
    # SLIDE 4: OUR SOLUTION (MINDSOLACE)
    # -------------------------------------------------------------
    s4 = prs.slides.add_slide(blank_layout)
    add_bg(s4, C_BG)
    add_header(s4, "Our Solution: MindSolace (The 4 Pillars)")

    add_card(s4, Inches(0.8), Inches(1.8), Inches(5.6), Inches(2.4),
             "1. Talk to AI Companion",
             [
                 "Available 24/7 with zero waiting time.",
                 "Detects your emotion and gives a warm, comforting reply.",
                 "You can even speak via your microphone!"
             ], C_BLUE, "🤖")

    add_card(s4, Inches(6.8), Inches(1.8), Inches(5.6), Inches(2.4),
             "2. Talk to Real Online Peers",
             [
                 "Connect with other students online who are ready to listen.",
                 "Add friendly listeners to your Support Friends list.",
                 "Chat 1-on-1 privately in real-time."
             ], C_TEAL, "👥")

    add_card(s4, Inches(0.8), Inches(4.5), Inches(5.6), Inches(2.4),
             "3. Mood Tracker & Easy Charts",
             [
                 "Log how you felt today using simple emojis (1 to 5).",
                 "Pick what caused it (Studies, Sleep, Exams, Loneliness).",
                 "See your 7-day mood curve on interactive graphs."
             ], C_PURPLE, "📊")

    add_card(s4, Inches(6.8), Inches(4.5), Inches(5.6), Inches(2.4),
             "4. Safety SOS & Calming Tools",
             [
                 "If someone writes extreme distress words, emergency help pops up.",
                 "Verified 24/7 Govt. Helplines (Tele-MANAS 14416).",
                 "4-7-8 Breathing circle to stop panic and calm down."
             ], C_RED, "🛡️")

    # -------------------------------------------------------------
    # SLIDE 5: TECHNOLOGIES WE USED
    # -------------------------------------------------------------
    s5 = prs.slides.add_slide(blank_layout)
    add_bg(s5, C_BG)
    add_header(s5, "Technologies & Tools We Used")

    add_card(s5, Inches(0.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Frontend & Design",
             [
                 "HTML5: For the website structure and forms.",
                 "CSS3 (Glassmorphism): For the modern dark & light themes, frosted cards, and smooth animations.",
                 "Responsive Design: Looks great on both laptop and mobile screens."
             ], C_BLUE, "🎨")

    add_card(s5, Inches(4.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "JavaScript & Web APIs",
             [
                 "JavaScript (ES6): Handles all button clicks, tabs, and chat logic.",
                 "LocalStorage: Acts as our private database inside the browser.",
                 "Web Speech API: Mic speech-to-text + voice speech playback.",
                 "BroadcastChannel API: Syncs peer chat live between tabs."
             ], C_TEAL, "⚡")

    add_card(s5, Inches(8.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Libraries & Python",
             [
                 "Chart.js: Draws the beautiful line graphs and pie charts.",
                 "Lucide Icons: Clean, modern icons for all buttons.",
                 "Python: Simple local web server (server.py) and documentation generator."
             ], C_NAVY, "🐍")

    # -------------------------------------------------------------
    # SLIDE 6: MAIN PAGES & FEATURES
    # -------------------------------------------------------------
    s6 = prs.slides.add_slide(blank_layout)
    add_bg(s6, C_BG)
    add_header(s6, "Walkthrough of Main Features (What Can a User Do?)")

    add_card(s6, Inches(0.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Easy & Private Entry",
             [
                 "1-Click Anonymous Guest Mode: Jump right in without signing up.",
                 "Dashboard: Daily inspiring quotes, your check-in streak, and quick shortcuts.",
                 "Theme Switcher: Toggle between Dark Night and Light Day themes anytime."
             ], C_BLUE, "🏠")

    add_card(s6, Inches(4.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Chat & Community",
             [
                 "AI Console: Chat with quick prompt chips like 'I feel lonely' or 'Exam stress'.",
                 "Peer Directory: See online listening buddies like Priya and Aarav.",
                 "Friends List: Save trusted listeners and chat 1-on-1."
             ], C_TEAL, "💬")

    add_card(s6, Inches(8.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Reflection & Health",
             [
                 "Personal Journal: Write your diary entries privately.",
                 "AI Reframing: Click a button to get a gentle, positive perspective on what you wrote.",
                 "Backup: Download all your logs in 1-click as a JSON file."
             ], C_PURPLE, "📝")

    # -------------------------------------------------------------
    # SLIDE 7: HOW THE AI UNDERSTANDS EMOTIONS
    # -------------------------------------------------------------
    s7 = prs.slides.add_slide(blank_layout)
    add_bg(s7, C_BG)
    add_header(s7, "How Our AI Understands Emotions (Simple NLP)")

    add_card(s7, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Emotion Classification Algorithm",
             [
                 "When a user types a message, our code scans the text in real-time.",
                 "It checks for emotion words from smart dictionaries:",
                 "  • Sadness: 'sad', 'crying', 'broken', 'heartbroken', 'down'",
                 "  • Anxiety: 'scared', 'panic', 'nervous', 'exam', 'stressed'",
                 "  • Loneliness: 'lonely', 'alone', 'isolated', 'nobody'",
                 "  • Anger: 'angry', 'frustrated', 'mad', 'gussa'",
                 "  • Happy: 'happy', 'grateful', 'peaceful', 'excited'",
                 "It instantly attaches an emotion badge to the message!"
             ], C_BLUE, "🧠")

    add_card(s7, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Compassionate Response Generation",
             [
                 "Rule-Based Empathy: Instead of generic robot replies, it responds like a caring counselor:",
                 "  'I hear how heavy things feel right now. You don't have to carry this alone. I'm right here listening.'",
                 "Voice Playback: Reads out the comforting message aloud in a soothing voice.",
                 "Gemini AI Ready: Users can plug in an optional Google Gemini API key for advanced conversational depth."
             ], C_TEAL, "🌸")

    # -------------------------------------------------------------
    # SLIDE 8: REAL PEER-TO-PEER CHAT
    # -------------------------------------------------------------
    s8 = prs.slides.add_slide(blank_layout)
    add_bg(s8, C_BG)
    add_header(s8, "Talking to Real Peers (Live Multi-Tab Chat)")

    add_card(s8, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Online Peer Directory",
             [
                 "Sometimes you want to talk to a real human being instead of AI.",
                 "The directory shows active peers with their current status:",
                 "  • Priya Sharma: 🟢 Available to Listen",
                 "  • Aarav Patel: 💬 Seeking Comfort",
                 "Click '+ Add Friend' to add them to your support circle.",
                 "Click '💬 Chat' to switch from AI chat to a private peer room."
             ], C_TEAL, "👥")

    add_card(s8, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "How It Works in College Labs",
             [
                 "We used HTML5 BroadcastChannel API.",
                 "How to demo it to teachers:",
                 "  1. Open 2 browser tabs side-by-side on your laptop.",
                 "  2. Type a message in Tab 1 and hit Send.",
                 "  3. It immediately pops up in Tab 2 in real-time!",
                 "Even when running solo, demo buddies reply warmly so you can always showcase the chat."
             ], C_BLUE, "⚡")

    # -------------------------------------------------------------
    # SLIDE 9: SAFETY SOS & 4-7-8 BREATHING
    # -------------------------------------------------------------
    s9 = prs.slides.add_slide(blank_layout)
    add_bg(s9, C_BG)
    add_header(s9, "Safety Net: Crisis SOS & 4-7-8 Breathing Tool")

    add_card(s9, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "High-Risk Crisis Safety (SOS)",
             [
                 "If a user types extreme phrases like 'want to die' or 'harm myself', our safety scanner catches it immediately.",
                 "It pops up the Emergency SOS Screen with verified free 24/7 helplines in India:",
                 "  • Tele-MANAS (Govt. of India): 14416 / 1800-891-4416",
                 "  • Vandrevala Foundation: +91 9999 666 555",
                 "  • NIMHANS Helpline: 080-46110007",
                 "Ensures clinical safety for users in extreme distress."
             ], C_RED, "🚨")

    add_card(s9, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "4-7-8 Guided Breathing Tool",
             [
                 "A clinically proven exercise that lowers heart rate and stops panic attacks in under 2 minutes.",
                 "Animated Visual Circle with live countdown timer:",
                 "  1. Inhale slowly through nose (4 Seconds) → Circle expands",
                 "  2. Hold your breath gently (7 Seconds) → Circle stays steady",
                 "  3. Exhale softly through mouth (8 Seconds) → Circle contracts",
                 "Super easy to use whenever you feel overwhelmed."
             ], C_TEAL, "🌬️")

    # -------------------------------------------------------------
    # SLIDE 10: WHY WE USED LOCALSTORAGE (NO SQL)
    # -------------------------------------------------------------
    s10 = prs.slides.add_slide(blank_layout)
    add_bg(s10, C_BG)
    add_header(s10, "How We Handled Data: Why No SQL?")

    add_card(s10, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Why Client-Side Storage? (Key Reasons)",
             [
                 "1. 100% Privacy by Design:",
                 "   Mental health diaries and secret thoughts should never sit on a public server where anyone could hack or read them.",
                 "2. Works 100% Offline:",
                 "   No server downtime, no internet dropouts. You can open the website anywhere, anytime.",
                 "3. Fast & Zero Lag:",
                 "   Everything saves and loads in milliseconds directly on your device."
             ], C_PURPLE, "🔒")

    add_card(s10, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "How MindCareDB Works",
             [
                 "We created our own JavaScript Database Manager (`MindCareDB`).",
                 "Uses browser LocalStorage with clean JSON format:",
                 "  • Saves users, chat history, mood logs, and journals.",
                 "  • Automatically pre-loads realistic demo data so the app looks complete on first open.",
                 "Data Export: Users can click 'Export Data' to download a `.json` backup file of everything."
             ], C_BLUE, "🗄️")

    # -------------------------------------------------------------
    # SLIDE 11: FUTURE SCOPE (WHAT WE CAN ADD NEXT)
    # -------------------------------------------------------------
    s11 = prs.slides.add_slide(blank_layout)
    add_bg(s11, C_BG)
    add_header(s11, "Future Scope: How We Can Expand This")

    add_card(s11, Inches(0.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Smarter Machine Learning",
             [
                 "Train a dedicated Deep Learning model (DistilBERT / TensorFlow.js).",
                 "Understand complex sentence context, sarcasm, and hidden cries for help.",
                 "Provide personalized emotional recovery plans."
             ], C_BLUE, "🤖")

    add_card(s11, Inches(4.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Audio Voice Rooms",
             [
                 "Add real-time voice call rooms using WebRTC.",
                 "Allow students to join anonymous voice circles to share exam stress.",
                 "Voice tone analysis to detect panic spikes."
             ], C_TEAL, "🎙️")

    add_card(s11, Inches(8.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Mobile Apps (Android & iOS)",
             [
                 "Convert this web app into a mobile app using React Native or Flutter.",
                 "Send daily check-in push notifications ('How are you feeling today?').",
                 "Smartwatch sync to track anxiety heart rate spikes."
             ], C_PURPLE, "📱")

    # -------------------------------------------------------------
    # SLIDE 12: CONCLUSION & WHAT WE LEARNED
    # -------------------------------------------------------------
    s12 = prs.slides.add_slide(blank_layout)
    add_bg(s12, C_BG)
    add_header(s12, "Conclusion & What We Learned")

    add_card(s12, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "What We Built & Achieved",
             [
                 "Successfully created a complete, working emotional support web platform.",
                 "Integrated AI conversation, real peer chat, mood analytics, and crisis SOS into one simple website.",
                 "Gave lonely and stressed students a safe space where they never have to suffer alone.",
                 "Met all MCA Minor Project (MCA 306) guidelines."
             ], C_TEAL, "🏆")

    add_card(s12, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "What We Learned as Students",
             [
                 "Building Single Page Applications (SPA) with pure HTML, CSS, and modern JavaScript.",
                 "Working with Browser Web APIs (Web Speech, BroadcastChannel, LocalStorage).",
                 "Creating interactive charts and data visualizations with Chart.js.",
                 "Team collaboration, problem solving, and designing with empathy."
             ], C_BLUE, "🎓")

    # -------------------------------------------------------------
    # SLIDE 13: THANK YOU & LIVE DEMO (With Enrollment Numbers)
    # -------------------------------------------------------------
    s13 = prs.slides.add_slide(blank_layout)
    add_bg(s13, RGBColor(15, 23, 42))

    card13 = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(1.0), Inches(10.933), Inches(5.5))
    card13.fill.solid()
    card13.fill.fore_color.rgb = RGBColor(30, 41, 59)
    card13.line.color.rgb = C_BLUE
    card13.line.width = Pt(2)

    tb13 = s13.shapes.add_textbox(Inches(1.6), Inches(1.3), Inches(10.1), Inches(4.9))
    tf13 = tb13.text_frame
    tf13.word_wrap = True

    p = tf13.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "Thank You! 🌿"
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    p.space_after = Pt(8)

    p = tf13.add_paragraph()
    p.alignment = PP_ALIGN.CENTER
    p.text = "We are ready to present a Live Demo of MindSolace!"
    p.font.size = Pt(18)
    p.font.color.rgb = C_TEAL
    p.space_after = Pt(20)

    p = tf13.add_paragraph()
    p.alignment = PP_ALIGN.CENTER
    p.text = "PROJECT TEAM MEMBERS:"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = RGBColor(186, 230, 253)
    p.space_after = Pt(8)

    team_members_table = [
        "Simran  —  2504MCACS0019",
        "Jhalak Jaiswal  —  2504MCACS0008",
        "Swati Bhadoriya  —  2504MCAAIML0058",
        "Vinay Gehlot  —  2504MCAAIML0070"
    ]
    for row in team_members_table:
        p = tf13.add_paragraph()
        p.alignment = PP_ALIGN.CENTER
        p.text = row
        p.font.size = Pt(13.5)
        p.font.bold = True
        p.font.color.rgb = RGBColor(255, 255, 255)
        p.space_after = Pt(2)

    p = tf13.add_paragraph()
    p.alignment = PP_ALIGN.CENTER
    p.text = "\nDepartment of Computer Applications  |  MCA Minor Project (MCA 306)"
    p.font.size = Pt(11)
    p.font.color.rgb = C_MUTED

    # Save to both paths
    p1 = r"G:\MCA\projects\mindsolac\MindSolace_Presentation.pptx"
    prs.save(p1)
    print(f"Presentation updated with Enrollment numbers at: {p1}")

    p2 = r"G:\MCA\projects\mindsolac\MindSolace_Presentation_Easy.pptx"
    prs.save(p2)

if __name__ == '__main__':
    build_student_presentation()
