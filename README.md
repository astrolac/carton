# carton
<h1>Carton Maps</h1>
<div>
<p><b>2016-02-15 15:05</b></p>
<p>Возник вопрос, как отображать слои и привязывать к ним объекты.
Как я понял, в Leaflet, слой - вещь весьма конкретная. Т.е. мы создаем некоторый набор элементов и из него формируем
слой, который можно прикрепить к карте для отображения. Т.о. он статичен.</p>
<p>Получается, что нам необходимо будет хранить собственные объекты в качестве абстракций слоев. Из них создавать наборы
геометрических элементов для формирования слоя leaflet. Затем формировать слой leaflet и привязывать его к карте для
отображения.</p>
<p>В приниципе получается стройно:
<ol>
<li>мы храним свои слои в виде объектов, со всей сопутствующей информацией, включая данные о геометрии отображения;
</li>
<li>при необходимости отразить этот слой, из абстрактного слоя мы формируем набор объектов для отображения;
</li>
<li>из этого набора формируем слой leaflet;
</li>
<li>отображаем leaflet слой на карте.
</li>
</ol>
</p>
<p>В частности для динамичных данных с заданной периодичностью будет формироваться слой leaflet, и прикреплятся к карте.
Старый слой при этом будет открепляться от карты и удаляться.</p>
</div>
