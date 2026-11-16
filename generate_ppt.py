"""
MindSolace - MCA Minor Project PowerPoint Presentation Generator
Creates a professional 16:9 widescreen presentation matching college presentation guidelines.
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os

def create_presentation():
    prs = Presentation()
    # 16:9 Widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette
    C_NAVY = RGBColor(15, 23, 42)       # #0F172A
    C_SLATE = RGBColor(30, 41, 59)      # #1E293B
    C_INDIGO = RGBColor(79, 70, 229)    # #4F46E5
    C_TEAL = RGBColor(13, 148, 136)     # #0D9488
    C_ROSE = RGBColor(225, 29, 72)      # #E11D48
    C_WHITE = RGBColor(255, 255, 255)
    C_LIGHT_BG = RGBColor(248, 250, 252)# #F8FAFC
    C_CARD_BG = RGBColor(255, 255, 255)
    C_CARD_BORDER = RGBColor(226, 232, 240)
    C_TEXT_DARK = RGBColor(15, 23, 42)
    C_TEXT_MUTED = RGBColor(100, 116, 139)

    def add_bg(slide, color):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category_text="MCA MINOR PROJECT (MCA 306)"):
        # Category / Breadcrumb
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(0.4))
        tf_c = cat_box.text_frame
        tf_c.word_wrap = True
        p_c = tf_c.paragraphs[0]
        p_c.text = category_text.upper()
        p_c.font.size = Pt(11)
        p_c.font.bold = True
        p_c.font.color.rgb = C_TEAL
        p_c.font.name = "Segoe UI"

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.7), Inches(0.8))
        tf_t = title_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(24)
        p_t.font.bold = True
        p_t.font.color.rgb = C_NAVY
        p_t.font.name = "Segoe UI"

    def add_card(slide, left, top, width, height, title, points, accent_color=C_INDIGO, icon="✦"):
        # Card background rectangle
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_CARD_BORDER
        card.line.width = Pt(1.5)

        # Content Box inside card
        tb = slide.shapes.add_textbox(left + Inches(0.25), top + Inches(0.25), width - Inches(0.5), height - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True

        # Header in card
        p_h = tf.paragraphs[0]
        p_h.text = f"{icon}  {title}"
        p_h.font.size = Pt(16)
        p_h.font.bold = True
        p_h.font.color.rgb = accent_color
        p_h.font.name = "Segoe UI"
        p_h.space_after = Pt(10)

        for pt in points:
            p = tf.add_paragraph()
            p.text = f"•  {pt}"
            p.font.size = Pt(12)
            p.font.color.rgb = C_TEXT_DARK
            p.font.name = "Segoe UI"
            p.space_after = Pt(6)

    # -------------------------------------------------------------
    # SLIDE 1: TITLE SLIDE (Dark Navy Premium Theme)
    # -------------------------------------------------------------
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1, C_NAVY)

    # Accent decorative banner
    banner = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(11.733), Inches(5.9))
    banner.fill.solid()
    banner.fill.fore_color.rgb = C_SLATE
    banner.line.color.rgb = C_INDIGO
    banner.line.width = Pt(2)

    tb1 = s1.shapes.add_textbox(Inches(1.2), Inches(1.1), Inches(10.9), Inches(5.3))
    tf1 = tb1.text_frame
    tf1.word_wrap = True

    p = tf1.paragraphs[0]
    p.text = "MCA MINOR PROJECT PRESENTATION (MCA 306)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_TEAL
    p.space_after = Pt(12)

    p = tf1.add_paragraph()
    p.text = "MindSolace 🌿"
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.space_after = Pt(6)

    p = tf1.add_paragraph()
    p.text = "Share Your Feelings, Vent, and Find Comfort with AI & Peer Listeners"
    p.font.size = Pt(16)
    p.font.italic = True
    p.font.color.rgb = RGBColor(165, 180, 252) # Light indigo
    p.space_after = Pt(24)

    p = tf1.add_paragraph()
    p.text = "PROJECT TEAM MEMBERS:"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_TEAL
    p.space_after = Pt(4)

    team = ["1. Simran (MCA Candidate)", "2. Jhalak Jaiswal (MCA Candidate)", "3. Swati Bhadoriya (MCA Candidate)", "4. Vinay Gehlot (MCA Candidate)"]
    for m in team:
        p = tf1.add_paragraph()
        p.text = m
        p.font.size = Pt(12)
        p.font.color.rgb = C_WHITE

    p = tf1.add_paragraph()
    p.text = "\nDepartment of Computer Applications  |  Master of Computer Applications (MCA)"
    p.font.size = Pt(11)
    p.font.color.rgb = C_TEXT_MUTED

    # -------------------------------------------------------------
    # SLIDE 2: INTRODUCTION & MOTIVATION
    # -------------------------------------------------------------
    s2 = prs.slides.add_slide(blank_layout)
    add_bg(s2, C_LIGHT_BG)
    add_header(s2, "Introduction & Project Motivation")

    add_card(s2, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "The Mental Health Dilemma",
             [
                 "Surge in emotional distress, academic burnout, and loneliness among students & youth.",
                 "High societal pressure, exam stress, and uncertainty causing frequent anxiety.",
                 "Fear of judgment and stigma prevents individuals from speaking openly with family.",
                 "Lack of an immediate listener during late-night emotional crises and breakdowns."
             ], C_ROSE, "⚠️")

    add_card(s2, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Why MindSolace?",
             [
                 "Provides a 24/7 safe, empathetic, and judgment-free sanctuary.",
                 "Dual solace channels: Talk with an AI Companion OR connected Real Peers.",
                 "Combines psychological grounding (4-7-8 breathing) with emergency safety nets.",
                 "100% Client-Side Privacy: Complete peace of mind with zero data tracking."
             ], C_TEAL, "🌿")

    # -------------------------------------------------------------
    # SLIDE 3: PROBLEM STATEMENT
    # -------------------------------------------------------------
    s3 = prs.slides.add_slide(blank_layout)
    add_bg(s3, C_LIGHT_BG)
    add_header(s3, "Problem Statement & Industry Gaps")

    add_card(s3, Inches(0.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "1. Social Stigma",
             [
                 "Mental struggles are still considered taboo in many social circles.",
                 "Students fear being labeled as 'weak' or 'incapable'.",
                 "Result: Emotional suppression, chronic loneliness, and silent suffering."
             ], C_INDIGO, "🤐")

    add_card(s3, Inches(4.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "2. Accessibility Barrier",
             [
                 "Professional counseling requires high fees, appointments, and travel.",
                 "Unavailable during sudden 2 AM panic attacks or anxiety episodes.",
                 "Lack of immediate self-help coping tools for instant relaxation."
             ], C_ROSE, "⏳")

    add_card(s3, Inches(8.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "3. Privacy Risks",
             [
                 "Commercial mental health apps harvest user profiles and sell data.",
                 "Mandatory social logins expose user identity.",
                 "Users hesitate to write honest feelings on insecure cloud platforms."
             ], C_TEAL, "🔒")

    # -------------------------------------------------------------
    # SLIDE 4: PROPOSED SOLUTION & CORE VISION
    # -------------------------------------------------------------
    s4 = prs.slides.add_slide(blank_layout)
    add_bg(s4, C_LIGHT_BG)
    add_header(s4, "Proposed Solution: The MindSolace Ecosystem")

    add_card(s4, Inches(0.8), Inches(1.8), Inches(5.6), Inches(2.4),
             "🤖 24/7 AI Empathy Companion",
             [
                 "Empathetic conversational console offering comforting responses.",
                 "Voice Speech-to-Text input and soothing Text-to-Speech playback."
             ], C_INDIGO, "💬")

    add_card(s4, Inches(6.8), Inches(1.8), Inches(5.6), Inches(2.4),
             "👥 Real Peer Listening Community",
             [
                 "Connect with available online peers for compassionate 1-on-1 sharing.",
                 "Personal Support Friends List & live multi-tab communication."
             ], C_TEAL, "🤝")

    add_card(s4, Inches(0.8), Inches(4.5), Inches(5.6), Inches(2.4),
             "📊 Mood Tracker & Analytics",
             [
                 "Daily check-in (score 1-5, emotion tags & stress triggers).",
                 "Interactive Chart.js visualizations (7-day trend curve, emotion pie chart)."
             ], C_INDIGO, "📈")

    add_card(s4, Inches(6.8), Inches(4.5), Inches(5.6), Inches(2.4),
             "🚨 Safety SOS & Crisis Intervention",
             [
                 "Automated high-risk distress scanner triggering verified helplines.",
                 "Interactive 4-7-8 animated breathing guide for instant grounding."
             ], C_ROSE, "🛡️")

    # -------------------------------------------------------------
    # SLIDE 5: SYSTEM ARCHITECTURE & TECHNOLOGY STACK
    # -------------------------------------------------------------
    s5 = prs.slides.add_slide(blank_layout)
    add_bg(s5, C_LIGHT_BG)
    add_header(s5, "Technology Stack & Architectural Architecture")

    add_card(s5, Inches(0.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Frontend Layer",
             [
                 "HTML5: Single-Page Application (SPA) shell with zero page reloads.",
                 "CSS3: Custom Glassmorphic design system with theme variables.",
                 "Responsive Layout: Desktop sidebar + mobile bottom navigation bar.",
                 "Lucide Icons: Modern vector iconography."
             ], C_INDIGO, "🎨")

    add_card(s5, Inches(4.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Logic & Web APIs",
             [
                 "Vanilla ES6+ JavaScript: Modular object-oriented controller classes.",
                 "LocalStorage API (MindCareDB): 100% private client-side NoSQL storage.",
                 "Web Speech API: Voice recognition & speech synthesis.",
                 "BroadcastChannel API: Real-time peer messaging across browser tabs."
             ], C_TEAL, "⚡")

    add_card(s5, Inches(8.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Data & Backend Tools",
             [
                 "Chart.js: Interactive HTML5 canvas trend & doughnut charts.",
                 "Python 3 (server.py): Local development web server & sentiment API.",
                 "Python-docx / pptx: Automated reporting & slide deck generation.",
                 "Google Gemini API: Optional generative LLM connectivity."
             ], C_SLATE, "🐍")

    # -------------------------------------------------------------
    # SLIDE 6: DETAILED MODULES BREAKDOWN
    # -------------------------------------------------------------
    s6 = prs.slides.add_slide(blank_layout)
    add_bg(s6, C_LIGHT_BG)
    add_header(s6, "Complete Functional Modules (13 Core Modules)")

    add_card(s6, Inches(0.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "User & Core Console",
             [
                 "1. Authentication: Register, Login, Session.",
                 "2. Anonymous Mode: 1-Click guest access.",
                 "3. Dashboard: Daily wisdom & streaks.",
                 "4. Talk to AI: 24/7 RC Console Companion."
             ], C_INDIGO, "🔐")

    add_card(s6, Inches(4.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Community & Wellness",
             [
                 "5. Peer Directory: Live listening buddies.",
                 "6. Support Friends: Add/manage friend circle.",
                 "7. Mood Tracker: 1-5 score, triggers & notes.",
                 "8. Mood Analytics: Dynamic Chart.js trends."
             ], C_TEAL, "👥")

    add_card(s6, Inches(8.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Reflection & Safety",
             [
                 "9. Personal Journal: Private thought diary.",
                 "10. AI Reframing: Positive gentle feedback.",
                 "11. Safety SOS: Tele-MANAS 14416 integration.",
                 "12. 4-7-8 Breathing: Visual panic relief.",
                 "13. Profile Settings: Themes & JSON export."
             ], C_ROSE, "🛡️")

    # -------------------------------------------------------------
    # SLIDE 7: AI EMOTION DETECTION & NLP ENGINE
    # -------------------------------------------------------------
    s7 = prs.slides.add_slide(blank_layout)
    add_bg(s7, C_LIGHT_BG)
    add_header(s7, "AI / NLP Emotion Detection & Response Logic")

    add_card(s7, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Lexicon-Based Emotion Classifier",
             [
                 "Real-Time Text Tokenization: Analyzes user input strings on every send event.",
                 "Emotion Keyword Vector Dictionaries:",
                 "  • Sadness (sad, depressed, crying, broken, hurt)",
                 "  • Anxiety (anxious, stressed, panic, nervous, exam)",
                 "  • Loneliness (lonely, alone, isolated, abandoned)",
                 "  • Anger (angry, frustrated, mad, annoyed)",
                 "  • Happy / Hopeful (happy, peaceful, grateful, great)",
                 "Assigns visual color-coded emotion tags to every conversation message."
             ], C_INDIGO, "🧠")

    add_card(s7, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Empathetic Responder & Safety Filter",
             [
                 "Contextual Offline Empathy Engine: Formulates soothing, validating messages tailored to the detected emotion.",
                 "Optional Transformer LLM: Connects to Google Gemini 1.5 Flash for deep open-domain conversational comfort.",
                 "High-Risk Crisis Scanner: Regex pattern matching scans for self-harm keywords (suicide, end my life, etc.).",
                 "Instant Fail-Safe: Immediately triggers the SOS Emergency Modal when crisis risk is flagged."
             ], C_TEAL, "🛡️")

    # -------------------------------------------------------------
    # SLIDE 8: PEER-TO-PEER LISTENING COMMUNITY
    # -------------------------------------------------------------
    s8 = prs.slides.add_slide(blank_layout)
    add_bg(s8, C_LIGHT_BG)
    add_header(s8, "Peer-to-Peer Community & Live Cross-Tab Sync")

    add_card(s8, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Listening Buddies & Friends Circle",
             [
                 "Online Directory of active listening peers (e.g., Priya, Aarav, Rohan, Ananya).",
                 "Real-time status indicators (🟢 Available to Listen, 💬 Seeking Comfort).",
                 "1-Click 'Add as Friend' saves peer to user's persistent Support Friends List.",
                 "Allows switching directly from AI chat to private 1-on-1 peer conversation."
             ], C_TEAL, "👥")

    add_card(s8, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "BroadcastChannel API Architecture",
             [
                 "No Heavy Backend Required: Uses modern HTML5 Web BroadcastChannel API.",
                 "Instant Cross-Tab Message Synchronization: Messages sent in Tab 1 immediately render in Tab 2 in real-time.",
                 "Interactive Demo Peer Responses: Simulated listening buddies provide warm empathetic responses during solo evaluation.",
                 "Enables multi-user demonstration on college lab systems effortlessly."
             ], C_INDIGO, "⚡")

    # -------------------------------------------------------------
    # SLIDE 9: SAFETY INTERVENTION & 4-7-8 BREATHING TOOL
    # -------------------------------------------------------------
    s9 = prs.slides.add_slide(blank_layout)
    add_bg(s9, C_LIGHT_BG)
    add_header(s9, "Crisis Safety Intervention & Grounding Tools")

    add_card(s9, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Verified Emergency Helplines (SOS)",
             [
                 "Integrated National Mental Health Helplines:",
                 "  • Tele-MANAS (Govt of India 24/7): 14416 / 1800-891-4416",
                 "  • Vandrevala Foundation Helpline: +91 9999 666 555",
                 "  • NIMHANS National Support: 080-46110007",
                 "Launches automatically upon detecting high emotional distress.",
                 "Includes 1-click launcher for immediate breathing relaxation."
             ], C_ROSE, "🚨")

    add_card(s9, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "4-7-8 Guided Breathing Tool",
             [
                 "Clinically proven breathing cycle to calm nervous system & ease acute panic attacks.",
                 "Interactive Animated Visual Guide:",
                 "  • Inhale through nose (4 Seconds) → Circle expands",
                 "  • Hold breath gently (7 Seconds) → Circle maintains glow",
                 "  • Exhale slowly through mouth (8 Seconds) → Circle contracts",
                 "Real-time digital countdown timer guides user focus."
             ], C_TEAL, "🌬️")

    # -------------------------------------------------------------
    # SLIDE 10: DATABASE ARCHITECTURE (MindCareDB)
    # -------------------------------------------------------------
    s10 = prs.slides.add_slide(blank_layout)
    add_bg(s10, C_LIGHT_BG)
    add_header(s10, "Database Architecture: Why Client-Side NoSQL?")

    add_card(s10, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Architectural Rationale (No SQL)",
             [
                 "100% Privacy by Design: Mental health journals and private thoughts should never sit on an unencrypted remote server.",
                 "Zero-Knowledge Architecture: Data remains strictly within user's local device sandbox.",
                 "Offline-First Operation: App operates seamlessly with zero server downtime, latency, or connection drops.",
                 "Flexible Schema: JSON document storage easily handles array triggers and conversation histories without complex JOINs."
             ], C_INDIGO, "🔒")

    add_card(s10, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "MindCareDB Storage Collections",
             [
                 "mindsolace_users & mindsolace_session: Auth credentials & guest states.",
                 "mindsolace_moods: Daily mood scores, tags, and reflection notes.",
                 "mindsolace_journals: Diary records, categories, and AI reframing notes.",
                 "mindsolace_chats & direct_messages: AI console & peer chat histories.",
                 "mindsolace_friends_*: User's personal peer support circle.",
                 "Data Portability: 1-click JSON backup export & local storage reset."
             ], C_TEAL, "🗄️")

    # -------------------------------------------------------------
    # SLIDE 11: RESULTS & HIGHLIGHTS
    # -------------------------------------------------------------
    s11 = prs.slides.add_slide(blank_layout)
    add_bg(s11, C_LIGHT_BG)
    add_header(s11, "Project Results & Evaluation Highlights")

    add_card(s11, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "Key Accomplishments",
             [
                 "13 out of 13 Planned Modules fully engineered and verified.",
                 "Blazing fast performance: Zero-reload SPA transitions under 100ms.",
                 "Accurate real-time emotion tagging across diverse user emotional states.",
                 "Multi-modal interaction: Voice recognition & speech synthesis audio playback.",
                 "Interactive Chart.js visualizations tracking emotional recovery trends."
             ], C_TEAL, "✅")

    add_card(s11, Inches(6.8), Inches(1.8), Inches(5.6), Inches(5.0),
             "System Verification",
             [
                 "Multi-Tab Real-Time Sync: Successfully tested peer messages arriving across independent browser windows.",
                 "Cross-Browser Compatibility: Tested on Google Chrome, Microsoft Edge, and Mozilla Firefox.",
                 "Responsive Mobile Experience: Touch-friendly UI with bottom navigation bar.",
                 "Zero External Build Dependency: Runs on any machine right out of the box."
             ], C_INDIGO, "📱")

    # -------------------------------------------------------------
    # SLIDE 12: FUTURE SCOPE
    # -------------------------------------------------------------
    s12 = prs.slides.add_slide(blank_layout)
    add_bg(s12, C_LIGHT_BG)
    add_header(s12, "Future Scope & Potential Enhancements")

    add_card(s12, Inches(0.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Deep Learning NLP",
             [
                 "Upgrading lexicon matching to fine-tuned DistilBERT / TensorFlow.js models.",
                 "Detecting subtle emotional nuances, sarcasm, and indirect cry-for-help signals.",
                 "Contextual multi-turn dialogue memory."
             ], C_INDIGO, "🤖")

    add_card(s12, Inches(4.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Global Peer Matching",
             [
                 "Integrating WebSockets / WebRTC for global real-time peer audio rooms.",
                 "Smart matching algorithm connecting peers with shared emotional experiences.",
                 "Moderated community support circles."
             ], C_TEAL, "🌐")

    add_card(s12, Inches(8.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "Mobile Native Apps",
             [
                 "Packaging MindSolace as native Android & iOS mobile applications via React Native / Flutter.",
                 "Smartwatch biometric integration (heart rate & panic spike detection).",
                 "Push notifications for daily check-in streaks."
             ], C_SLATE, "📱")

    # -------------------------------------------------------------
    # SLIDE 13: CONCLUSION
    # -------------------------------------------------------------
    s13 = prs.slides.add_slide(blank_layout)
    add_bg(s13, C_NAVY)

    banner13 = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(11.733), Inches(5.9))
    banner13.fill.solid()
    banner13.fill.fore_color.rgb = C_SLATE
    banner13.line.color.rgb = C_TEAL
    banner13.line.width = Pt(2)

    tb13 = s13.shapes.add_textbox(Inches(1.2), Inches(1.2), Inches(10.9), Inches(5.1))
    tf13 = tb13.text_frame
    tf13.word_wrap = True

    p = tf13.paragraphs[0]
    p.text = "CONCLUSION"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = C_TEAL
    p.space_after = Pt(14)

    p = tf13.add_paragraph()
    p.text = "MindSolace bridges the critical gap between Artificial Intelligence, Peer Empathy, and Mental Health Solace."
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.space_after = Pt(16)

    conclusion_points = [
        "Offers a comforting, non-judgmental sanctuary for anyone experiencing loneliness, depression, or exam anxiety.",
        "Proves that digital mental wellness platforms can deliver high clinical safety and utility without compromising personal privacy.",
        "Provides immediate solace: 'Share Your Feelings, Vent, and Find Comfort with AI & Peer Listeners.'",
        "Successfully accomplishes all academic and technical objectives for the MCA Minor Project (MCA 306)."
    ]
    for cp in conclusion_points:
        p = tf13.add_paragraph()
        p.text = f"•  {cp}"
        p.font.size = Pt(13)
        p.font.color.rgb = RGBColor(226, 232, 240)
        p.space_after = Pt(8)

    # -------------------------------------------------------------
    # SLIDE 14: THANK YOU & Q&A
    # -------------------------------------------------------------
    s14 = prs.slides.add_slide(blank_layout)
    add_bg(s14, C_NAVY)

    banner14 = s14.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.5), Inches(1.2), Inches(10.333), Inches(5.1))
    banner14.fill.solid()
    banner14.fill.fore_color.rgb = C_SLATE
    banner14.line.color.rgb = C_INDIGO
    banner14.line.width = Pt(2)

    tb14 = s14.shapes.add_textbox(Inches(2.0), Inches(1.6), Inches(9.333), Inches(4.3))
    tf14 = tb14.text_frame
    tf14.word_wrap = True

    p = tf14.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "Thank You! 🌿"
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.space_after = Pt(10)

    p = tf14.add_paragraph()
    p.alignment = PP_ALIGN.CENTER
    p.text = "Any Questions or Discussion?"
    p.font.size = Pt(20)
    p.font.color.rgb = C_TEAL
    p.space_after = Pt(24)

    p = tf14.add_paragraph()
    p.alignment = PP_ALIGN.CENTER
    p.text = "PROJECT TEAM (MCA):"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = RGBColor(165, 180, 252)
    p.space_after = Pt(6)

    p = tf14.add_paragraph()
    p.alignment = PP_ALIGN.CENTER
    p.text = "Simran  |  Jhalak Jaiswal  |  Swati Bhadoriya  |  Vinay Gehlot"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.space_after = Pt(12)

    p = tf14.add_paragraph()
    p.alignment = PP_ALIGN.CENTER
    p.text = "Department of Computer Applications  |  MCA 306 Minor Project"
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT_MUTED

    # Save Presentation
    output_path = r"G:\MCA\projects\mindsolac\MindSolace_Project_Presentation.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully at: {output_path}")

if __name__ == '__main__':
    create_presentation()
