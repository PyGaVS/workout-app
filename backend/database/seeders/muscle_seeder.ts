import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Muscle from '#models/muscle'

export default class MuscleSeeder extends BaseSeeder {
  public async run() {
    const muscles = [
      // Haut du corps
      'Biceps brachial',
      'Triceps brachial',
      'Brachial antérieur',
      'Brachio-radial',
      'Fléchisseurs de l’avant-bras',
      'Extenseurs de l’avant-bras',
      'Deltoïde antérieur',
      'Deltoïde moyen',
      'Deltoïde postérieur',
      'Trapèze supérieur',
      'Trapèze moyen',
      'Trapèze inférieur',
      'Petit rond',
      'Grand rond',
      'Infra-épineux',
      'Sous-scapulaire',
      'Grand pectoral',
      'Petit pectoral',
      'Dentelé antérieur',
      'Grand dorsal',
      'Rhomboïdes',
      'Érecteurs du rachis',
      'Carré des lombes',

      // Tronc
      'Grand droit de l’abdomen',
      'Obliques externes',
      'Obliques internes',
      'Transverse de l’abdomen',

      // Bas du corps
      'Droit fémoral',
      'Vaste latéral',
      'Vaste médial',
      'Vaste intermédiaire',
      'Biceps fémoral',
      'Semi-tendineux',
      'Semi-membraneux',
      'Grand adducteur',
      'Court adducteur',
      'Long adducteur',
      'Tenseur du fascia lata',
      'Sartorius',
      'Grand fessier',
      'Moyen fessier',
      'Petit fessier',
      'Piriforme',
      'Gastrocnémien',
      'Soléaire',
      'Tibial antérieur',
    ]

    await Muscle.createMany(muscles.map((name) => ({ name })))
  }
}
