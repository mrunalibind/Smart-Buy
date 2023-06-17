function showAlert(message, type) {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container';
  
    const alertElement = document.createElement('div');
    alertElement.className = `alert ${type}`;
    
    const alertMessage = document.createElement('span');
    alertMessage.textContent = message;
    
    const alertClose = document.createElement('span');
    alertClose.className = 'alert-close';
    alertClose.innerHTML = '&times;';
    alertClose.addEventListener('click', function() {
      alertContainer.remove();
    });
    
    alertElement.appendChild(alertMessage);
    alertElement.appendChild(alertClose);
    alertContainer.appendChild(alertElement);
    
    document.body.appendChild(alertContainer);
  }