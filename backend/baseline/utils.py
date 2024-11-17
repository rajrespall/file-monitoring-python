from django.core.mail import send_mail
from django.conf import settings

def send_scan_notification(user, scan_results):
    """Send email notification for scan results"""
    
    # Count issues
    issues = sum(1 for result in scan_results if result['status'] != 'unchanged')
    
    if issues > 0:
        subject = f'[IntegrityHub] File Integrity Scan Alert - {issues} Issues Found'
        
        # Build message body
        message = "File Integrity Scan Results:\n\n"
        for result in scan_results:
            if result['status'] != 'unchanged':
                message += f"File: {result['filename']}\n"
                message += f"Status: {result['status']}\n"
                if result['status'] == 'modified':
                    message += f"Expected Hash: {result['expected_hash']}\n"
                    message += f"Current Hash: {result['current_hash']}\n"
                message += "-----------------\n"
                
        try:
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )
            return True
        except Exception as e:
            print(f"Email sending failed: {str(e)}")
            return False
    return True