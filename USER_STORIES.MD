# Nomad User Stories:

## Story #1 Simple task solving request:
1. User Adam wants to have a comparison on the best bang for the buck pair of headphones for music production ([Feature Chat](#feature-chat))
2. He goes to the website and after logging in starts typing "Hello, I'd like to find the best headphones for music production under 100$"
3. Adam is a new customer so as he's typing ([Feature Real Time Chat Updates](#feature-realtime-chat-updates)) can be submitted to the first free Nomad that will claim him as a customer ([Feature Customer Claim](#feature-customer-claim)), which happens to be willing and taking orders ([Feature Taking Orders Button](#feature-take-orders-button))
4. Britta sends back a message that she's willing to help Adam. And starts chatting with him. This is where billable time starts for Adam and also Britta's performance analytics fire up ([Feature Time Billing](#feature-time-billing))
5. Adam replies specifying more details about his order. The first reply he does confirms a taken order, this is where the ticket is confirmed and assigned actively to Britta ([Feature Delayed Ticket Acquisition](#feature-delayed-ticket-acquisition))
6. Britta and Adam talk with each other as long as they're both on the same page regarding the requirements of the headphones Adam want to find
7. Britta informs Adam that she'll take care of the set task and sends a question to him about how long does he wants her to spend on the task. Choosing from 15/30/60/120/"Use your best judgement" minutes. ([Feature Time Limit Dialog](#feature-time-limit-dialog)) ([Threat Measuring time of the task](#threat-measuring-time-of-the-task))
8. Adam picks "Use your best judgement" option and gets informed by Britta that she'll take care of it
9. The chat is resolved and Britta asks Adam how would he like to receive a notification about the task being complete.
10. Dialog popup appears for Adam stating (Email / SMS ) if he hasn't selected a default option yet ([Feature Completion Notification](#feature-completion-notification))
11. End of Customer-Nomad interaction scenario

# Features:
## <a name="feature-chat">1. Chat</a>
Chat for the customer that is stylish, easy to understand and can be displayed in a webapp or a native app
## <a name="feature-realtime-chat-updates">2. Real Time Chat Updates:</a>
Whatever the user types in the chat should be **immediately** visible to all of the Nomads and/or the default Nomad. This will ensure that the task can be replied as quick as possible.
## <a name="feature-customer-claim"> 3. Customer Claim </a>
When the default Nomad is not available or the user doesn't have an appointed Nomad yet, it should be possible for the Nomads to claim a customer for themselves.
## <a name="feature-taking-orders-button"> 4. Taking Orders Button </a>
When a Nomad has the website open they can mark a toggle button that they are willing to take orders in this moment. This button should emit a heart-beat to the server ensuring that it doesn't stay on accidentally
## <a name="feature-time-billing"> 5. Time Billing </a>
Time billing activates when a first dialogue is established between the customer and the Nomad. Although it is not yet a "closed deal", in case if it is, this is the starting point when the customer is charged for, and the starting point where the Nomad is accounted for.
## <a name="feature-delayed-ticket-acquisition"> 6. Delayed Ticket Acquisition </a>
The deal gets "closed" **only** and **only** after the customer wrote back to the Nomad that he's still willing to get his problem solved. If this doesn't happen, the customer is not charged and the Nomad doesn't get any compensation.
## <a name="feature-completion-notification"> 7. Completion Notification </a>
A user should always have the best way possible to know when his problem was solved. They can choose SMS or Email notification on top of regular push notifications to be informed about action required.
# Threats
## <a name="threat-measuring-time-of-the-task"> 1. Measuring Time of the Task </a>
Nomads will most likely multi-task, they should however keep track of the time spent for a specific task for a specific user. A time tracking software would be perfect. Somthing similar to WakaTime tracking each site visited would yield the best results in terms of accurate time tracking and analytics on what works best.
## <a name="handling-urgent-orders"> 2. Handling Urgent Orders </a>
There is a certain category of tasks that require solving as soon as possible. A user should be allowed to select (sooner the better) an urgency for his task. A safety measure should be provided to prevent abuse of increased urgency feature.