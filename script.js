// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Alterna entre "Sim" e "Não" nos equipamentos e mostra/esconde a área de descrição
    document.querySelectorAll('input[name="equipment"]').forEach(radio => {
      radio.addEventListener('change', function () {
        const equipmentDetails = document.getElementById('equipmentDetails');
        if (this.value === 'Sim') {
          equipmentDetails.classList.remove('hidden');
          document.getElementById('equipmentDescription').removeAttribute('disabled');
        } else {
          equipmentDetails.classList.add('hidden');
          document.getElementById('equipmentDescription').setAttribute('disabled', 'disabled');
        }
      });
    });
  
    // Alternar campos entre evento de um dia e evento com múltiplos dias
    document.getElementById('singleDayRadio').addEventListener('change', function () {
      if (this.checked) {
        document.getElementById('singleDayFields').classList.remove('hidden-fields');
        document.getElementById('singleDayFields').classList.add('visible-fields');
        document.getElementById('multiDayFields').classList.remove('visible-fields');
        document.getElementById('multiDayFields').classList.add('hidden-fields');
  
        // Limpar os campos de múltiplos dias
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
      }
    });
  
    document.getElementById('multiDayRadio').addEventListener('change', function () {
      if (this.checked) {
        document.getElementById('multiDayFields').classList.remove('hidden-fields');
        document.getElementById('multiDayFields').classList.add('visible-fields');
        document.getElementById('singleDayFields').classList.remove('visible-fields');
        document.getElementById('singleDayFields').classList.add('hidden-fields');
  
        // Limpar os campos de um único dia
        document.getElementById('singleDate').value = '';
        document.getElementById('startTime').value = '';
        document.getElementById('endTime').value = '';
      }
    });
  
    // Mostra o campo de outro tipo de evento quando selecionado
    document.getElementById('eventType').addEventListener('change', function () {
      const otherContainer = document.getElementById('otherEventTypeContainer');
      if (this.value === 'Outro') {
        otherContainer.classList.remove('hidden');
        document.getElementById('otherEventType').setAttribute('required', 'required');
      } else {
        otherContainer.classList.add('hidden');
        document.getElementById('otherEventType').removeAttribute('required');
        document.getElementById('otherEventType').value = '';
      }
    });
  
    // Envio do formulário via WhatsApp
    document.getElementById('eventForm').addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Coleta de dados do formulário
      const name = document.getElementById('name').value;
      const role = document.getElementById('role').value;
      const phone = document.getElementById('phone').value;
      let eventType = document.getElementById('eventType').value;
      if (eventType === 'Outro') {
        eventType = document.getElementById('otherEventType').value;
      }
  
      // FORMATAÇÃO DA DATA CORRIGIDA PARA FUSO HORÁRIO BRASILEIRO
      let eventDates = '';
      if (document.getElementById('singleDayRadio').checked) {
        const singleDate = document.getElementById('singleDate').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
  
        // Corrigindo a criação da data para não subtrair 1 dia
        const [year, month, day] = singleDate.split('-');
        const formattedDate = `${day}/${month}/${year}`;
  
        eventDates = `${formattedDate}, das ${startTime} às ${endTime}`;
      } else {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const startTimeMulti = document.getElementById('startTimeMulti').value;
        const endTimeMulti = document.getElementById('endTimeMulti').value;
  
        const [startY, startM, startD] = startDate.split('-');
        const [endY, endM, endD] = endDate.split('-');
  
        const formattedStart = `${startD}/${startM}/${startY}`;
        const formattedEnd = `${endD}/${endM}/${endY}`;
  
        eventDates = `De ${formattedStart} ${startTimeMulti} a ${formattedEnd} ${endTimeMulti}`;
      }
  
      const venueName = document.getElementById('venueName').value;
      const street = document.getElementById('street').value;
      const number = document.getElementById('number').value;
      const neighborhood = document.getElementById('neighborhood').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const fullAddress = `${street}, ${number} - ${neighborhood}, ${city}/${state}`;
  
      const equipment = document.querySelector('input[name="equipment"]:checked').value;
      let equipmentDetails = '';
      if (equipment === 'Sim') {
        equipmentDetails = document.getElementById('equipmentDescription').value;
      }
  
      const socialMedia = document.getElementById('socialMedia').value;
      const additionalInfo = document.getElementById('additionalInfo').value;
  
      // Monta a mensagem para WhatsApp
      let message = `*FORMULÁRIO DE AGENDAMENTO - EVELYN PIO*%0A%0A`;
      message += `*Solicitante:* ${name}%0A`;
      message += `*Cargo/Representação:* ${role}%0A`;
      message += `*Telefone:* ${phone}%0A%0A`;
      message += `*Tipo de Evento:* ${eventType}%0A`;
      message += `*Data(s) do Evento:* ${eventDates}%0A%0A`;
      message += `*Local do Evento:*%0A`;
      message += `${venueName}%0A`;
      message += `${fullAddress}%0A%0A`;
      message += `*Equipamentos disponíveis:* ${equipment}`;
      if (equipmentDetails) {
        message += ` (${equipmentDetails})`;
      }
      message += `%0A%0A`;
  
      if (socialMedia) {
        message += `*Redes Sociais:* ${socialMedia}%0A%0A`;
      }
      if (additionalInfo) {
        message += `*Informações Adicionais:* ${additionalInfo}%0A`;
      }
  
      const phoneNumber = '5581989550769';
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    });
});  