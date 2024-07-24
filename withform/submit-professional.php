<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $jsonFile = 'data.json';
    $currentData = json_decode(file_get_contents($jsonFile), true);

    // Generate a new ID
    $newId = max(array_column($currentData, 'id')) + 1;

    $newEntry = [
        'id' => $newId,
        'name' => $data['name'],
        'profession' => $data['profession'],
        'contact' => $data['contact'],
        'category' => $data['category'],
        'twitter' => $data['twitter']
    ];

    $currentData[] = $newEntry;

    if (file_put_contents($jsonFile, json_encode($currentData, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to write to file']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid data received']);
}
